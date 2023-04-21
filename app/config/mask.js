import { render, decorate, lockMovement } from '@/libs/fabric'
import COLORS from '@/app/assets/colors'

const handPointer = (i) => i.set({ hoverCursor: 'pointer' })
const normalize = (i) => i.set({ fill: COLORS.primary, opacity: 0.1 })
const highlight = (i, opacity = 0.5) => i.set({ fill: COLORS.primary, opacity })
const absolutePositioned = (i) => i.set({ absolutePositioned: true })

const handleMouseOut = (i) => () => render(normalize(i))
const handleMouseOver = (i) => () => render(highlight(i))

function enableMouseOver(i) {
  i.on('mouseover', handleMouseOver(i))
  i.on('mouseout', handleMouseOut(i))
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
      item.notify()
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
