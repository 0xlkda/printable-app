import { applyMaskConfig } from '@/config/mask'
import { applyTextConfig } from '@/config/text'
import { createCanvas, enlivenObjects, setBorderWidth } from '@/libs/fabric'
import * as API from './api'

function createFontLoader({ name, filename }) {
  return new FontFace(name, `url(${API.createFontURL(filename)})`)
}

async function addFontsToDocument(fontNames) {
  const fonts = await API.getFonts(fontNames)
  const fontLoaders = fonts.map(createFontLoader)

  for (const loader of fontLoaders) {
    const fontface = await loader.load()
    if (!document.fonts.has(fontface)) {
      document.fonts.add(fontface)
    }
  }
}

globalThis.canvas = createCanvas({
  containerClass: 'personalize-canvas-container',
  enableRetinaScaling: false,
  allowTouchScrolling: true,
  selection: false
})

const CanvasCommands = (handler) => {
  const commands = {
    CREATE_CANVAS: ({ background, size, fonts, masks, texts, paths }) => {
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
        const items = objects.map(applyMaskConfig)
        items.forEach(item => {
          item.selected = () => handler.emit('SELECT_MASK', item)
        })
        canvas.add(...items)
      })

      addFontsToDocument(fonts.map(font => font.replace(/[']+/g, '')))
        .then(() => {
          enlivenObjects(texts, (objects) => {
            const items = objects.map(applyTextConfig)
            canvas.add(...items)
            handler.emit('CANVAS_CREATED', canvas)
          })
        })
    },

    RESIZE: () => {
      const canvasEl = canvas.getElement()
      const container = canvas.wrapperEl
      if (!container) return
      container.style.height = `${canvasEl.offsetHeight}px`
    }
  }

  // reference command to commands[command].key
  Object.keys(commands).forEach(command => {
    commands[command].key = command
  })

  return commands
}

export function createCanvasCommands(handler) {
  return CanvasCommands(handler)
}
