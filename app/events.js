import { createMessage } from '@/libs/monitor'

export default {
  STARTED: createMessage('STARTED'),
  PRODUCT_LOADED: createMessage('PRODUCT_LOADED'),
  CANVAS_LOADED: createMessage('CANVAS_LOADED'),
  PRODUCT_PERSONALIZE_SUBMITTED: createMessage('PRODUCT_PERSONALIZE_SUBMITTED'),
  SHUT_DOWN: createMessage('SHUT_DOWN')
}

