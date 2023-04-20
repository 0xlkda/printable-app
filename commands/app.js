import { applyMaskConfig } from '@/config/mask'
import { applyTextConfig } from '@/config/text'
import { createCanvas, enlivenObjects, setBorderWidth } from '@/libs/fabric'
import { createApp } from '@/components/app.jsx'
import { addFontsToDocument } from '@/libs/browser'
import * as API from '@/api'

function div(text, id) {
  const div = document.createElement('div')
  div.id = id
  div.textContent = text
  return div
}

const appRoot = document.getElementById('personalize-app')
const app = createApp(appRoot)
const canvas = createCanvas({
  containerClass: 'personalize-canvas-container',
  enableRetinaScaling: false,
  allowTouchScrolling: true,
  selection: false
})

export function createCommands(handler) {
  return {
    DISPLAY_APP: (props) => {
      app.render({ ...props, state: 'LOADED' })
    },

    DISPLAY_CANVAS: ({ background, size, fonts, masks, texts, paths }) => {
      setBorderWidth(Math.floor(size.width / 200))

      canvas.sendCommand = handler.emit.bind(handler)
      canvas.setDimensions(size)
      canvas.setDimensions({
        width: '100%', maxWidth: '720px',
        height: 'auto', maxHeight: '720px'
      }, { cssOnly: true })

      enlivenObjects([background], ([item]) => {
        canvas.insertAt(item, 0)
      })

      enlivenObjects(paths, (objects) => {
        canvas.add(...objects)
      })

      enlivenObjects(masks, (objects) => {
        const items = objects
          .map(applyMaskConfig)
          .map(item => {
            item.notify = () => handler.emit('SELECT_MASK', item)
            return item
          })

        canvas.add(...items)
      })

      addFontsToDocument(API, fonts.map(font => font.replace(/[']+/g, '')))
        .then(() => {
          enlivenObjects(texts, (objects) => {
            const items = objects
              .map(applyTextConfig)
              .map(item => {
                item.notify = () => handler.emit('SELECT_TEXT', item)
                return item
              })

            canvas.add(...items)
            appRoot.prepend(canvas.wrapperEl)
            handler.emit('CANVAS_CREATED', canvas)
          })
        })
        .catch(error => handler.emit('CANVAS_CREATE_ERROR', error))
    },

    RESIZE_CANVAS: () => {
      const canvasEl = canvas.getElement()
      const container = canvas.wrapperEl
      if (!container) return
      container.style.height = `${canvasEl.offsetHeight}px`
    },

    DISPLAY_PHOTO_EDITOR: (mask) => {
      app.render({ state: 'LOADED', module: 'Photo', target: mask })
    },

    DISPLAY_TEXT_EDITOR: (text) => {
      app.render({ state: 'LOADED', module: 'Text', target: text })
    },

    DISPLAY_LOADING_SCREEN: () => {
      app.render({ state: 'LOADING' })
    },

    DISPLAY_SUBMITTING_SCREEN: () => {
      app.render({ state: 'SUBMITTING' })
    },

    SHOW_THANK_YOU: () => {
      document.body.append(div('thank you!'))
    }
  }
}
