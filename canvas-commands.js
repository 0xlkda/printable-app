import { fabric } from 'fabric'
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

function enlivenObjects(objects, handle) {
  fabric.util.enlivenObjects(objects, handle)
}

const CanvasCommands = (handler) => {
  const commands = {
    CREATE_CANVAS: ({ background, fonts, masks, texts, paths }) => {
      const canvas = new fabric.Canvas()
      canvas.setWidth(background.width)
      canvas.setHeight(background.height)
      canvas.setZoom(0.5)

      enlivenObjects([background], ([item]) => {
        canvas.insertAt(item, 0)
      })

      enlivenObjects(masks, (items) => {
        canvas.add(...items)
      })

      enlivenObjects(paths, (items) => {
        canvas.add(...items)
      })

      addFontsToDocument(fonts.map(font => font.replace(/[']+/g, '')))
        .then(() => {
          enlivenObjects(texts, (items) => {
            canvas.add(...items)
            handler.emit('CANVAS_CREATED', canvas)
          })
        })
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
