const AppEvents = (handler) => {
  const events = {
    PRODUCT_LOADED: handler.lazyEmit('PRODUCT_LOADED'),
    PRODUCT_PERSONALIZE_SUBMITTED: handler.lazyEmit('PRODUCT_PERSONALIZE_SUBMITTED'),

    PHOTO_UPLOADED: handler.lazyEmit('PHOTO_UPLOADED'),

    SHUT_DOWN: handler.lazyEmit('SHUT_DOWN')
  }


  Object.keys(events).forEach(event => {
    events[event].key = event
  })

  return events
}

export function createAppEvents(handler) {
  return AppEvents(handler)
}
