import { createApp } from '@/libs/react'
import { createCanvas, enlivenObjects, setBorderWidth } from '@/libs/fabric'
import { addFontsToDocument } from '@/libs/browser'
import { applyMaskConfig } from '@/config/mask'
import { applyTextConfig } from '@/config/text'
import * as API from '@/api'
import { UserCommands, AppEvents } from '@/app/context'

const rootElement = document.getElementById('personalize-app')
const app = createApp(rootElement)
const canvas = createCanvas({
  containerClass: 'personalize-canvas-container',
  enableRetinaScaling: false,
  allowTouchScrolling: true,
  selection: false
})

export function displayApp(props) {
  app.render({ ...props, state: 'LOADED' })
}

export function displayCanvas({ background, size, fonts, masks, texts, paths }) {
  setBorderWidth(Math.floor(size.width / 200))

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
        item.notify = () => UserCommands.SELECT_MASK(item)
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
            item.notify = () => UserCommands.SELECT_TEXT(item)
            return item
          })

        canvas.add(...items)
        rootElement.prepend(canvas.wrapperEl)
        AppEvents.CANVAS_LOADED(canvas)
      })
    })
    .catch(error => console.log('CANVAS_CREATE_ERROR', error))
}

export function resizeCanvas() {
  const canvasEl = canvas.getElement()
  const container = canvas.wrapperEl
  if (!container) return
  container.style.height = `${canvasEl.offsetHeight}px`
}

export function displayPhotoEditor(mask) {
  app.render({ state: 'LOADED', module: 'Photo', target: mask })
}

export function displayTextEditor(text) {
  app.render({ state: 'LOADED', module: 'Text', target: text })
}

export function displayLoadingScreen() {
  app.render({ state: 'LOADING' })
}

export function displaySubmittingScreen() {
  app.render({ state: 'SUBMITTING' })
}

export function showThankYou() {
  document.body.append('THANK YOU')
}
