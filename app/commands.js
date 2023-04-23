import * as handlers from '@/app/handlers'
import AppEvents from '@/app/events'

export default {
  START: handlers.start,
  DISPLAY_APP: handlers.displayApp,
  DISPLAY_CANVAS: handlers.displayCanvas,
  UPDATE_CANVAS_CONTAINER_HEIGHT: handlers.updateCanvasContainerHeight,
  DISPLAY_PHOTO_EDITOR: handlers.displayPhotoEditor,
  DISPLAY_TEXT_EDITOR: handlers.displayTextEditor,
  DISPLAY_LOADING_SCREEN: handlers.displayLoadingScreen,
  DISPLAY_SUBMITTING_SCREEN: handlers.displaySubmittingScreen,
  SHOW_THANK_YOU: handlers.showThankYou,
  SHUT_DOWN: AppEvents.SHUT_DOWN,
}
