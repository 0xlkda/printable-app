import { Logger } from 'medkit'
import Manager from '@/manager'
import User from '@/user/commands'
import App from '@/app/commands'

Manager.onboard({
  logger: Logger,
  userCommands: {
    [User.OPEN_APP]: [
      App.START,
    ],

    [User.SELECT_MASK]: [
      App.DISPLAY_PHOTO_EDITOR,
    ],

    [User.SELECT_TEXT]: [
      App.DISPLAY_TEXT_EDITOR,
    ],

    [User.SUBMIT]: [
      App.DISPLAY_SUBMITTING_SCREEN,
    ],
  }
})

Manager.work()
User.OPEN_APP('product.json')
