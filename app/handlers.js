import { createApp } from '@/libs/react'
import { createCanvas, enlivenObjects, setBorderWidth } from '@/libs/fabric'
import { debounceResize, addFontsToDocument } from '@/libs/browser'
import * as API from '@/api'
import { unique } from '@/utils'
import AppEvents from '@/app/events'
import { isBackground, isMask, isNotMask, isText, isPath } from '@/app/predicate'
import { applyMaskConfig } from '@/app/config/mask'
import { applyTextConfig } from '@/app/config/text'

const app = createApp({ rootId: 'personalize-app' })
const canvas = createCanvas({
  containerClass: 'personalize-canvas-container',
  enableRetinaScaling: false,
  allowTouchScrolling: true,
  selection: false
})

canvas.on('selection:cleared', () => {
  app.render({ state: 'LOADED' })
})

export async function start(id) {
  AppEvents.STARTED(id)

  const product = await API.getProduct(id)
  if (!product) throw new Error('Product not found')

  const getSize = item => ({ width: item.width, height: item.height })
  const background = product.objects.find(isBackground)
  const masks = product.objects.filter(isMask)
  const texts = product.objects.filter(isText)
  const fonts = unique(texts.map(text => text.fontFamily))
  const paths = product.objects.filter(isNotMask).filter(isPath)
  const size = product.size || getSize(background)
  const detail = { background, size, masks, texts, fonts, paths }

  AppEvents.PRODUCT_LOADED(detail)

  // device events
  debounceResize(resizeCanvas)
}

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
    const items = objects.map(applyMaskConfig)
    canvas.add(...items)
  })

  addFontsToDocument(API, fonts.map(font => font.replace(/[']+/g, '')))
    .then(() => {
      enlivenObjects(texts, (objects) => {
        const items = objects.map(applyTextConfig)
        canvas.add(...items)
        app.root.prepend(canvas.wrapperEl)
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
