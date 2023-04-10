const UserCommands = (handler) => {
  const commands = {
    SHOW_PREVIEW: handler.lazyEmit('SHOW_PREVIEW'),
    SUBMIT: handler.lazyEmit('SUBMIT'),

    SELECT_PRODUCT: handler.lazyEmit('SELECT_PRODUCT'),
    CHANGE_PRODUCT: handler.lazyEmit('CHANGE_PRODUCT'),
    CHANGE_PRODUCT_VARIANT: handler.lazyEmit('CHANGE_PRODUCT_VARIANT'),

    UPLOAD_PHOTO: handler.lazyEmit('UPLOAD_PHOTO'),
    ASSIGN_PHOTO: handler.lazyEmit('ASSIGN_PHOTO'),
    REPLACE_PHOTO: handler.lazyEmit('REPLACE_PHOTO'),
    CROP_PHOTO: handler.lazyEmit('CROP_PHOTO'),
    FLIP_PHOTO: handler.lazyEmit('FLIP_PHOTO'),
    INSERT_TEXT: handler.lazyEmit('INSERT_TEXT'),

    REQUEST_CUSTOM_PHOTO_SHAPE: handler.lazyEmit('REQUEST_CUSTOM_PHOTO_SHAPE'),
    REQUEST_CUSTOM_ALPHABET_ART: handler.lazyEmit('REQUEST_CUSTOM_ALPHABET_ART'),

    SELECT_LOCATION: handler.lazyEmit('SELECT_LOCATION'),
    SELECT_MAP_THEME: handler.lazyEmit('SELECT_MAP_THEME'),
    SELECT_MAP_PIN: handler.lazyEmit('SELECT_MAP_PIN'),

    INSERT_DATE: handler.lazyEmit('INSERT_DATE'),
    SELECT_STAR_COLOR: handler.lazyEmit('SELECT_STAR_COLOR'),
    SELECT_STAR_BACKGROUND_COLOR: handler.lazyEmit('SELECT_STAR_BACKGROUND_COLOR'),

    SELECT_SONG: handler.lazyEmit('SELECT_SONG'),
    INSERT_TITLE: handler.lazyEmit('INSERT_TITLE'),
    INSERT_LYRIC: handler.lazyEmit('INSERT_LYRIC'),
    INSERT_ARTIST: handler.lazyEmit('INSERT_ARTIST'),
  }

  // reference command to commands[command].key
  Object.keys(commands).forEach(command => {
    commands[command].key = command
  })

  return commands
}

export function createUserCommands(handler) {
  return UserCommands(handler)
}
