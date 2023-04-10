function div(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div
}

const DisplayCommands = {
  RENDER_APP: ({ photos, texts }) => {
    document.body.append(div(`app rendered ${photos.length} photos ${texts.length} texts`))
  },
  RENDER_PHOTO_UPLOADING: (photo) => {
    document.body.append(div('uploading ' + photo))
  },
  RENDER_UPLOAD_SUCCESS: (photo) => {
    document.body.append(div(photo + ' uploaded'))
  },
  RENDER_PHOTO: ({ photo }) => {
    document.body.append(div('your photo: ' + photo))
  },
  RENDER_TEXT: (text) => {
    document.body.append(div('your text: ' + text))
  },
  RENDER_LOADING_SCREEN: () => {
    document.body.append(div('loading...'))
  },
  RENDER_SUBMITTING_SCREEN: () => {
    document.body.append(div('submitting...'))
  },
  SHOW_THANK_YOU: () => {
    document.body.append(div('thank you!'))
  }
}

export function createDisplayCommands() {
  return DisplayCommands
}
