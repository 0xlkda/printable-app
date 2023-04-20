import { Logger, createMessageBus } from 'medkit'
import { debounceResize } from '@/libs/browser'
import { unique } from '@/utils'
import * as API from './api'
import { isBackground, isMask, isNotMask, isText, isPath } from './predicate'
import { Monitor } from './monitor'
import { createContext } from './context'

const ShopManager = createMessageBus('shop-manager', 'browser', { logEmit: false, logger: Logger })
const {
  AppEvents,
  UserCommands,
  DisplayCommands,
  CanvasCommands,
} = createContext(ShopManager)

const removeAllEvents = Monitor(ShopManager, {
  // USER
  [UserCommands.SELECT_MASK.key]: [
    DisplayCommands.RENDER_PHOTO_EDITOR
  ],

  [UserCommands.UPLOAD_PHOTO.key]: [
    DisplayCommands.RENDER_PHOTO_UPLOADING
  ],

  [UserCommands.ASSIGN_PHOTO.key]: [
    DisplayCommands.RENDER_PHOTO
  ],

  [UserCommands.INSERT_TEXT.key]: [
    DisplayCommands.RENDER_TEXT
  ],

  [UserCommands.SUBMIT.key]: [
    DisplayCommands.RENDER_SUBMITTING_SCREEN
  ],

  // APP
  [AppEvents.STARTED.key]: [
    DisplayCommands.MOUNT_APP,
    DisplayCommands.RENDER_LOADING_SCREEN,
  ],

  [AppEvents.PRODUCT_LOADED.key]: [
    DisplayCommands.RENDER_APP,
    CanvasCommands.CREATE_CANVAS,
  ],

  [AppEvents.CANVAS_CREATED.key]: [
    DisplayCommands.MOUNT_CANVAS,
    CanvasCommands.RESIZE,
  ],

  [AppEvents.PHOTO_UPLOADED.key]: [
    DisplayCommands.RENDER_UPLOAD_SUCCESS,
  ],

  [AppEvents.PRODUCT_PERSONALIZE_SUBMITTED.key]: [
    DisplayCommands.SHOW_THANK_YOU,
  ],

  [AppEvents.SHUT_DOWN.key]: [
    (error) => {
      Logger.error(error)
      removeAllEvents()
    }
  ]
})

start()
  .catch(AppEvents.SHUT_DOWN)

async function start() {
  AppEvents.STARTED()

  const product = await API.getProduct('product.json').catch(Logger.error)
  if (!product) return

  const size = product.size
  const background = product.objects.find(isBackground)
  const masks = product.objects.filter(isMask)
  const texts = product.objects.filter(isText)
  const fonts = unique(texts.map(text => text.fontFamily))
  const paths = product.objects.filter(isNotMask).filter(isPath)
  const detail = { background, size, masks, texts, fonts, paths }
  Logger.log(detail, product)

  AppEvents.PRODUCT_LOADED(detail)

  // device events
  debounceResize(CanvasCommands.RESIZE)
}
