import * as API from './api'
import { applyMaskConfig } from './config-mask'
import { applyTextConfig } from './config-text'
import { createCanvas, enlivenObjects, setBorderWidth } from './fabric-util'

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

function updateContainerHeight(canvas) {
  requestAnimationFrame(() => {
    canvas.wrapperEl.style.height = `${canvas.getElement().offsetHeight}px`
  })
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

      canvas.setDimensions(size)
      canvas.setDimensions({ width: '100%', height: 'auto' }, { cssOnly: true })

      enlivenObjects([background], ([item]) => {
        canvas.insertAt(item, 0)
      })

      enlivenObjects(paths, (objects) => {
        canvas.add(...objects)
      })

      enlivenObjects(masks, (objects) => {
        const items = objects.map(applyMaskConfig)
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
      updateContainerHeight(canvas)
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
