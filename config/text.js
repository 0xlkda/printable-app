import COLORS from '@/assets/colors'
import { render, decorate, lockMovement } from '@/libs/fabric'

const handPointer = (i) => i.set({ hoverCursor: 'pointer' })
const normalize = (i) => i.set({ stroke: 'none', strokeWidth: 0 })
const highlight = (i) => i.set({ stroke: COLORS.primary, strokeWidth: 2 })

const handleMouseOut = (e) => render(normalize(e.target))
const handleMouseOver = (e) => render(highlight(e.target))

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

export function applyTextConfig(obj) {
  const item = decorate(obj, [handPointer, lockMovement])

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
