import { Monitor } from '@/libs/monitor'
import AppCommands from '@/app/commands'
import AppEvents from '@/app/events'

const Manager = {

  onboard({
    logger,
    userCommands
  }) {
    this.logger = logger
    this.userCommands = userCommands
    this.onboarded = true
  },

  work() {
    if (!this.onboarded) throw new Error('Please onboard me')
    this.logger.log('Have a nice day!')

    const turnOff = Monitor({
      ...this.userCommands,

      [AppEvents.STARTED.key]: [
        AppCommands.DISPLAY_LOADING_SCREEN,
      ],

      [AppEvents.PRODUCT_LOADED.key]: [
        AppCommands.DISPLAY_APP,
        AppCommands.DISPLAY_CANVAS,
      ],

      [AppEvents.CANVAS_LOADED.key]: [
        AppCommands.RESIZE_CANVAS,
      ],

      [AppEvents.PRODUCT_PERSONALIZE_SUBMITTED.key]: [
        AppCommands.SHOW_THANK_YOU,
      ],

      [AppEvents.SHUT_DOWN.key]: [
        () => turnOff()
      ],
    }, (error) => {
      this.logger.error(error)
    })

    this.logger.log('Started monitoring')
  },

  stop() {
    AppCommands.SHUT_DOWN()
    this.logger.log('Goodbye~')
  }
}

export default Manager
