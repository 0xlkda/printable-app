import { Logger, createMessageBus } from 'medkit'
import { debounceResize } from '@/libs/browser'
import { unique } from '@/utils'
import * as API from '@/api'
import { isBackground, isMask, isNotMask, isText, isPath } from './predicate'
import { Monitor } from './monitor'
import { createContext } from './context'

const ShopManager = createMessageBus('shop-manager', 'browser', { logEmit: false, logger: Logger })
const {
  AppEvents,
  AppCommands,
  UserCommands,
} = createContext(ShopManager)

const removeAllEvents = Monitor(ShopManager, {
  [UserCommands.SELECT_MASK.key]: [
    AppCommands.DISPLAY_PHOTO_EDITOR,
  ],

  [UserCommands.SELECT_TEXT.key]: [
    AppCommands.DISPLAY_TEXT_EDITOR,
  ],

  [AppEvents.STARTED.key]: [
    AppCommands.DISPLAY_LOADING_SCREEN,
  ],

  [AppEvents.PRODUCT_LOADED.key]: [
    AppCommands.DISPLAY_APP,
    AppCommands.DISPLAY_CANVAS,
  ],

  [AppEvents.CANVAS_CREATED.key]: [
    AppCommands.RESIZE_CANVAS,
  ],

  [AppEvents.PRODUCT_PERSONALIZE_SUBMITTED.key]: [
    AppCommands.SHOW_THANK_YOU,
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
  debounceResize(AppCommands.RESIZE_CANVAS)
}
