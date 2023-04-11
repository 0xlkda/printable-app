import { Logger, createEventBus } from 'medkit'
import * as API from './api'
import { createUserCommands } from './user-commands'
import { createAppEvents } from './app-events'
import { createDisplayCommands } from './display-commands'
import { isPhoto, isText } from './predicate'
import { Monitor } from './monitor'
import { sleep } from './util'

const ShopManager = createEventBus('shop-manager', 'browser', { logEmit: true, logger: Logger })
const AppEvents = createAppEvents(ShopManager)
const UserCommands = createUserCommands(ShopManager)
const DisplayCommands = createDisplayCommands(ShopManager)

// returned function to turn off all listeners
const removeAllEvents = Monitor(ShopManager, {
  // USER
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
  [AppEvents.PRODUCT_LOADED.key]: [
    DisplayCommands.MOUNT_APP,
    DisplayCommands.RENDER_APP,
    DisplayCommands.REMOVE_LOADING_SCREEN,
  ],

  [AppEvents.PHOTO_UPLOADED.key]: [
    DisplayCommands.RENDER_UPLOAD_SUCCESS,
  ],

  [AppEvents.PRODUCT_PERSONALIZE_SUBMITTED.key]: [
    DisplayCommands.SHOW_THANK_YOU,
  ],

  [AppEvents.SHUT_DOWN.key]: [
    () => {
      removeAllEvents()
    }
  ]
})

start()
async function start() {
  DisplayCommands.RENDER_LOADING_SCREEN()

  const product = await API.getProduct('product.json').catch(Logger.error)
  if (!product) return

  const photos = product?.objects.filter(isPhoto)
  const texts = product?.objects.filter(isText)

  AppEvents.PRODUCT_LOADED({ photos, texts })
}
