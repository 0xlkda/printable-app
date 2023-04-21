import { Logger } from 'medkit'
import Manager from '@/manager'
import User from '@/user/commands'
import App from '@/app/commands'

Manager.onboard({
  logger: Logger,
  userCommands: {
    [User.OPEN_APP.key]: [
      App.START,
    ],

    [User.SELECT_MASK.key]: [
      App.DISPLAY_PHOTO_EDITOR,
    ],

    [User.SELECT_TEXT.key]: [
      App.DISPLAY_TEXT_EDITOR,
    ],

    [User.SUBMIT.key]: [
      App.DISPLAY_SUBMITTING_SCREEN,
    ],
  }
})

Manager.work()
User.OPEN_APP('product-collage.json')
