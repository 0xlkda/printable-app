import { createMessage } from '@/libs/monitor'
import * as cmds from '@/app/commands'

export const AppEvents = {
  STARTED: createMessage('STARTED'),
  PRODUCT_LOADED: createMessage('PRODUCT_LOADED'),
  CANVAS_LOADED: createMessage('CANVAS_LOADED'),
  PRODUCT_PERSONALIZE_SUBMITTED: createMessage('PRODUCT_PERSONALIZE_SUBMITTED'),
  SHUT_DOWN: createMessage('SHUT_DOWN')
}

export const UserCommands = {
  SELECT_MASK: createMessage('SELECT_MASK'),
  SELECT_TEXT: createMessage('SELECT_TEXT'),
}

export const AppCommands = {
  DISPLAY_APP: cmds.displayApp,
  DISPLAY_CANVAS: cmds.displayCanvas,
  RESIZE_CANVAS: cmds.resizeCanvas,
  DISPLAY_PHOTO_EDITOR: cmds.displayPhotoEditor,
  DISPLAY_TEXT_EDITOR: cmds.displayTextEditor,
  DISPLAY_LOADING_SCREEN: cmds.displayLoadingScreen,
  DISPLAY_SUBMITTING_SCREEN: cmds.displaySubmittingScreen,
  SHOW_THANK_YOU: cmds.showThankYou
}
