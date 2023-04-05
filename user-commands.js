const UserCommands = (handler) => ({
  SHOW_PREVIEW: handler.emit('SHOW_PREVIEW'),
  SUBMIT: handler.emit('SUBMIT'),

  SELECT_PRODUCT: handler.emit('SELECT_PRODUCT'),
  CHANGE_PRODUCT: handler.emit('CHANGE_PRODUCT'),
  CHANGE_PRODUCT_VARIANT: handler.emit('CHANGE_PRODUCT_VARIANT'),

  UPLOAD_PHOTO: handler.emit('UPLOAD_PHOTO'),
  ASSIGN_PHOTO: handler.emit('ASSIGN_PHOTO'),
  REPLACE_PHOTO: handler.emit('REPLACE_PHOTO'),
  CROP_PHOTO: handler.emit('CROP_PHOTO'),
  FLIP_PHOTO: handler.emit('FLIP_PHOTO'),
  INSERT_TEXT: handler.emit('INSERT_TEXT'),

  REQUEST_CUSTOM_PHOTO_SHAPE: handler.emit('REQUEST_CUSTOM_PHOTO_SHAPE'),
  REQUEST_CUSTOM_ALPHABET_ART: handler.emit('REQUEST_CUSTOM_ALPHABET_ART'),

  SELECT_LOCATION: handler.emit('SELECT_LOCATION'),
  SELECT_MAP_THEME: handler.emit('SELECT_MAP_THEME'),
  SELECT_MAP_PIN: handler.emit('SELECT_MAP_PIN'),

  INSERT_DATE: handler.emit('INSERT_DATE'),
  SELECT_STAR_COLOR: handler.emit('SELECT_STAR_COLOR'),
  SELECT_STAR_BACKGROUND_COLOR: handler.emit('SELECT_STAR_BACKGROUND_COLOR'),

  SELECT_SONG: handler.emit('SELECT_SONG'),
  INSERT_TITLE: handler.emit('INSERT_TITLE'),
  INSERT_LYRIC: handler.emit('INSERT_LYRIC'),
  INSERT_ARTIST: handler.emit('INSERT_ARTIST'),
})

export function createUserCommands(handler) {
  return UserCommands(handler)
}
