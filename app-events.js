const AppEvents = (handler) => ({
  PRODUCT_LOADED: handler.emit('PRODUCT_LOADED'),
  PRODUCT_PERSONALIZE_SUBMITTED: handler.emit('PRODUCT_PERSONALIZE_SUBMITTED'),

  PHOTO_UPLOADED: handler.emit('PHOTO_UPLOADED')
})

export function createAppEvents(handler) {
  return AppEvents(handler)
}
