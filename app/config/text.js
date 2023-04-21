import { render, decorate, lockMovement, disableEdit } from '@/libs/fabric'
import COLORS from '@/app/assets/colors'

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
  item.set('maxLines', Number(item.maxLines) || 1)
  item.set('defaultText', item.text)
  item.set('defaultWidth', item.width)

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
    },
    'text:changed': ({ error, ok, value }) => {
      item.set('text', value || item.defaultText)

      if (item.textLines.length <= item.maxLines) {
        ok()
      } else {
        error()
        item.set('text', item.textLines.slice(0, item.maxLines).join('\n'))
      }

      item.set('width', item.defaultWidth)
      render(item)
    },
  })

  return item
}
