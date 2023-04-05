function div(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div
}

const DisplayCommands = {
  RENDER_PHOTO_UPLOADING: () => {
    document.body.append(div('uploading...'))
  },
  RENDER_PHOTO: () => {
    document.body.append(div('beautiful photo'))
  },
  RENDER_LOADING_SCREEN: () => {
    document.body.append(div('submitting...'))
  },
  SHOW_THANK_YOU: () => {
    document.body.append(div('thank you!'))
  }
}

export function createDisplayCommands() {
  return DisplayCommands
}
