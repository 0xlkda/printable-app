import COLORS from '@/assets/colors'
import { render, decorate, lockMovement, disableEdit } from '@/libs/fabric'

const handPointer = (i) => i.set({ hoverCursor: 'pointer' })
const normalize = (i) => i.set({ stroke: 'none', strokeWidth: 0 })
const highlight = (i) => i.set({ stroke: COLORS.primary, strokeWidth: 2 })

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

export function applyTextConfig(obj) {
  const item = decorate(obj, [handPointer, lockMovement, disableEdit])

  // events setup 
  enableMouseOver(item)

  item.on({
    'selected': () => {
      item.notify()
      disableMouseOver(item)
      render(normalize(item))
    },
    'deselected': () => {
      enableMouseOver(item)
      render(normalize(item))
    }
  })

  return item
}
