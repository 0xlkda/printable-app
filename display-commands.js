import { createApp } from './app.jsx'

function div(text, id) {
  const div = document.createElement('div')
  div.id = id
  div.textContent = text
  return div
}

const [mount, render] = createApp()

const DisplayCommands = {
  // app start
  MOUNT_APP: () => {
    mount()
  },
  RENDER_APP: (props) => {
    render(props)
  },

  // photo handle
  RENDER_PHOTO_UPLOADING: (photo) => {
    document.body.append(div('uploading ' + photo))
  },
  RENDER_UPLOAD_SUCCESS: (photo) => {
    document.body.append(div(photo + ' uploaded'))
  },
  RENDER_PHOTO: ({ photo }) => {
    document.body.append(div('your photo: ' + photo))
  },

  // text handle
  RENDER_TEXT: (text) => {
    document.body.append(div('your text: ' + text))
  },

  // loading state
  RENDER_LOADING_SCREEN: () => {
    document.body.append(div('loading...', 'loading'))
  },
  REMOVE_LOADING_SCREEN: () => {
    document.getElementById('loading')?.remove()
  },

  // submit state
  RENDER_SUBMITTING_SCREEN: () => {
    document.body.append(div('submitting...'))
  },

  // last step
  SHOW_THANK_YOU: () => {
    document.body.append(div('thank you!'))
  }
}

export function createDisplayCommands() {
  return DisplayCommands
}
