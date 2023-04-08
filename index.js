import { Logger, createEventBus } from 'medkit'
import * as API from './api'
import { createUserCommands } from './user-commands'
import { createAppEvents } from './app-events'
import { createDisplayCommands } from './display-commands'
import { isPhoto, isText } from './predicate'
import { keys, sleep } from './util'

const ShopManager = createEventBus('shop-manager', document)
const AppEvents = createAppEvents(ShopManager)
const UserCommands = createUserCommands(ShopManager)
const DisplayCommands = createDisplayCommands(ShopManager)

const userCommands = keys(UserCommands)
const appEvents = keys(AppEvents)
const everything = userCommands.concat(appEvents)

ShopMonitor(userCommands, AppEvents)
DisplayMonitor(everything, DisplayCommands)

function ShopMonitor(events, appEvents) {
  events.forEach((event) => {
    ShopManager.on(event, async ({ type, detail }) => {
      
      // tracking 
      Logger.log('User', type, detail)

      switch (event) {
      case 'UPLOAD_PHOTO':
        // do something
        await sleep(250)
        appEvents.PHOTO_UPLOADED()
        break

      case 'SUBMIT':
        // do something
        await sleep(250)
        appEvents.PRODUCT_PERSONALIZE_SUBMITTED()
        break

      default:
        break
      }
    })
  })
}

function DisplayMonitor(events, display) {
  events.forEach((event) => {
    ShopManager.on(event, async ({ type, detail }) => {
      
      // tracking 
      Logger.log('UI', type, detail)

      switch (event) {
      case 'UPLOAD_PHOTO':
        display.RENDER_PHOTO_UPLOADING()
        break

      case 'PHOTO_UPLOADED':
        display.RENDER_PHOTO()
        break

      case 'SUBMIT':
        display.RENDER_LOADING_SCREEN()
        break

      case 'PRODUCT_PERSONALIZE_SUBMITTED':
        display.SHOW_THANK_YOU()
        break

      default:
        break
      }
    })
  })
}

(async () => {
  const product = await API.getProduct('product.json').catch(Logger.error)
  if (!product) return

  const photos = product?.objects.filter(isPhoto)
  const texts = product?.objects.filter(isText)

  AppEvents.PRODUCT_LOADED({ photos, texts })
  await sleep(250)

  UserCommands.UPLOAD_PHOTO('photo-1.png'),
  UserCommands.UPLOAD_PHOTO('photo-2.png'),
  UserCommands.UPLOAD_PHOTO('photo-3.png'),
  await sleep(250)

  UserCommands.ASSIGN_PHOTO({ photo: 'photo-1', target: 'slot-1' })
  UserCommands.ASSIGN_PHOTO({ photo: 'photo-2', target: 'slot-2' })
  UserCommands.ASSIGN_PHOTO({ photo: 'photo-3', target: 'slot-3' })
  await sleep(250)

  UserCommands.INSERT_TEXT('text-1')
  UserCommands.INSERT_TEXT('text-2')
  await sleep(250)

  UserCommands.SHOW_PREVIEW()
  await sleep(250)

  UserCommands.SUBMIT()
})()

const uploadBtn = document.createElement('button')
uploadBtn.textContent = 'Upload'
uploadBtn.onclick = () => UserCommands.UPLOAD_PHOTO('photo-zzz')
document.body.appendChild(uploadBtn)

const submitBtn = document.createElement('button')
submitBtn.textContent = 'Submit'
submitBtn.onclick = () => UserCommands.SUBMIT()
document.body.appendChild(submitBtn)
