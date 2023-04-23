import { render, decorate, lockMovement, disableEdit } from '@/libs/fabric'
import COLORS from '@/app/assets/colors'
import UserCommands from '@/user/commands'
import AppCommands from '@/app/commands'

const handPointer = (textbox) => textbox.set({ hoverCursor: 'pointer' })
const clickable = (textbox) => textbox.set({ stroke: 'none', strokeWidth: 0 })
const highlight = (textbox) => textbox.set({ stroke: COLORS.primary, strokeWidth: 2 })

const handleMouseOut = (textbox) => () => render(clickable(textbox))
const handleMouseOver = (textbox) => () => render(highlight(textbox))

function enableMouseOver(textbox) {
  textbox.on('mouseover', handleMouseOver(textbox))
  textbox.on('mouseout', handleMouseOut(textbox))
  return textbox
}

function disableMouseOver(textbox) {
  textbox.off('mouseover')
  textbox.off('mouseout')
  return textbox
}

export function applyTextConfig(obj) {
  const textbox = decorate(obj, [handPointer, lockMovement, disableEdit])

  textbox.set('maxLines', Number(textbox.maxLines) || 1)
  textbox.set('defaultText', textbox.text)
  textbox.set('defaultWidth', textbox.width)

  // events setup 
  enableMouseOver(textbox)

  textbox.on({
    'selected': () => {
      UserCommands.SELECT_TEXT(textbox)
      disableMouseOver(textbox)
      render(clickable(textbox))
    },
    'deselected': () => {
      AppCommands.DISPLAY_APP({ state: 'LOADED' })
      enableMouseOver(textbox)
      render(clickable(textbox))
    },
    'text:changed': ({ error, ok, value }) => {
      textbox.set('text', value || textbox.defaultText)

      if (textbox.textLines.length <= textbox.maxLines) {
        ok()
      } else {
        error()
        textbox.set('text', textbox.textLines.slice(0, textbox.maxLines).join('\n'))
      }

      textbox.set('width', textbox.defaultWidth)
      render(textbox)
    },
  })

  return textbox
}
