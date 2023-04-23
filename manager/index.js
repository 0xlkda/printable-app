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

      [AppEvents.STARTED]: [
        AppCommands.DISPLAY_LOADING_SCREEN,
      ],

      [AppEvents.PRODUCT_LOADED]: [
        AppCommands.DISPLAY_APP,
        AppCommands.DISPLAY_CANVAS,
      ],

      [AppEvents.CANVAS_LOADED]: [
        AppCommands.UPDATE_CANVAS_CONTAINER_HEIGHT,
      ],

      [AppEvents.PRODUCT_PERSONALIZE_SUBMITTED]: [
        AppCommands.SHOW_THANK_YOU,
      ],

      [AppEvents.SHUT_DOWN]: [
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
