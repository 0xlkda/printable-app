import { keys } from './util'

const AppEvents = (bus) => {
  const events = {
    PRODUCT_LOADED: bus.lazyEmit('PRODUCT_LOADED'),
    PRODUCT_PERSONALIZE_SUBMITTED: bus.lazyEmit('PRODUCT_PERSONALIZE_SUBMITTED'),
    PHOTO_UPLOADED: bus.lazyEmit('PHOTO_UPLOADED'),
    SHUT_DOWN: bus.lazyEmit('SHUT_DOWN')
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
