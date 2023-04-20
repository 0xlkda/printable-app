import { keys } from '@/utils'

const AppEvents = (handler) => {
  const events = {
    STARTED: handler.lazyEmit('STARTED'),
    PRODUCT_LOADED: handler.lazyEmit('PRODUCT_LOADED'),
    PRODUCT_PERSONALIZE_SUBMITTED: handler.lazyEmit('PRODUCT_PERSONALIZE_SUBMITTED'),
    CANVAS_CREATED: handler.lazyEmit('CANVAS_CREATED'),
    PHOTO_UPLOADED: handler.lazyEmit('PHOTO_UPLOADED'),
    SHUT_DOWN: handler.lazyEmit('SHUT_DOWN')
  }

  // reference event to events[event].key
  keys(events).forEach(event => {
    events[event].key = event
  })

  return events
}

export function createAppEvents(handler) {
  return AppEvents(handler)
}
