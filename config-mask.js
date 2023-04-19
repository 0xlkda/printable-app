import COLORS from './colors'
import { render, decorate, lockMovement } from './fabric-util'

const handPointer = (i) => i.set({ hoverCursor: 'pointer' })
const normalize = (i) => i.set({ fill: COLORS.primary, opacity: 0.1 })
const highlight = (i, opacity = 0.5) => i.set({ fill: COLORS.primary, opacity })
const absolutePositioned = (i) => i.set({ absolutePositioned: true })

const handleMouseOut = e => render(normalize(e.target))
const handleMouseOver = e => render(highlight(e.target))

function enableMouseOver(i) {
  i.on('mouseover', handleMouseOver)
  i.on('mouseout', handleMouseOut)
  return i
}

function disableMouseOver(i) {
  i.off('mouseover')
  i.off('mouseout')
  return i
}

export function applyMaskConfig(obj) {
  const item = decorate(obj, [normalize, handPointer, lockMovement, absolutePositioned])

  // events setup 
  enableMouseOver(item)

  item.on({
    'selected': () => {
      disableMouseOver(item)
      render(highlight(item))
    },
    'deselected': () => {
      enableMouseOver(item)
      render(normalize(item))
    }
  })

  return item
}
