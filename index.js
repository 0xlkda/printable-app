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
    DisplayCommands.RENDER_SUBMITTING_SCREEN,
  ],

  // APP
  [AppEvents.PRODUCT_LOADED.key]: [
    DisplayCommands.RENDER_APP,
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

// main
start()

async function start() {
  const product = await API.getProduct('product.json').catch(Logger.error)
  if (!product) return

  const photos = product?.objects.filter(isPhoto)
  const texts = product?.objects.filter(isText)

  AppEvents.PRODUCT_LOADED({ photos, texts })

  UserCommands.UPLOAD_PHOTO('photo-1.png'),
  AppEvents.PHOTO_UPLOADED('photo-1')

  UserCommands.UPLOAD_PHOTO('photo-2.png'),
  AppEvents.PHOTO_UPLOADED('photo-2')

  UserCommands.UPLOAD_PHOTO('photo-3.png'),
  AppEvents.PHOTO_UPLOADED('photo-3')

  UserCommands.ASSIGN_PHOTO({ photo: 'photo-1', target: 'position-1' })
  UserCommands.ASSIGN_PHOTO({ photo: 'photo-2', target: 'position-2' })
  UserCommands.ASSIGN_PHOTO({ photo: 'photo-3', target: 'position-3' })

  UserCommands.INSERT_TEXT('text-1')
  UserCommands.INSERT_TEXT('text-2')

  UserCommands.SHOW_PREVIEW()

  UserCommands.SUBMIT()
  AppEvents.PRODUCT_PERSONALIZE_SUBMITTED()

  await sleep(3000)
  AppEvents.SHUT_DOWN()
}

// After 3s, app shutdown, both buttons do nothing
const uploadBtn = document.createElement('button')
uploadBtn.textContent = 'Upload'
uploadBtn.onclick = () => UserCommands.UPLOAD_PHOTO('photo-zzz')
document.body.appendChild(uploadBtn)

const submitBtn = document.createElement('button')
submitBtn.textContent = 'Submit'
submitBtn.onclick = () => UserCommands.SUBMIT()
document.body.appendChild(submitBtn)
