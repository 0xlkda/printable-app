import COLORS from './colors'
import { clone, lockMovement, decorate, render } from './fabric-util'

const handPointer = (i) => i.set({ hoverCursor: 'pointer' })
const normalize = (i) => i.set({ fill: COLORS.primary, opacity: 0.1 })
const highlight = (i, opacity = 0.5) => i.set({ fill: COLORS.primary, opacity })
const absolutePositioned = (i) => i.set({ absolutePositioned: true })

export function applyMaskConfig(obj) {
  const item = clone(obj)
  decorate(item, [normalize, handPointer, lockMovement, absolutePositioned])

  const handleMouseOut = e => render(normalize(e.target))
  const handleMouseOver = e => render(highlight(e.target))

  function enableMouseOver() {
    item.on('mouseover', handleMouseOver)
    item.on('mouseout', handleMouseOut)
  }

  function disableMouseOver() {
    item.off('mouseover')
    item.off('mouseout')
  }

  // events setup 
  enableMouseOver()

  item.on({
    'selected': e => {
      disableMouseOver()
      render(highlight(e.target))
    },
    'deselected': e => {
      enableMouseOver()
      render(normalize(e.target))
    }
  })

  return item
}
