import React from 'react'
import { createRoot } from 'react-dom/client'

function Info({ background, masks, texts }) {
  return (
    <div>
      hello {masks.length} {texts.length} {background.width} {background.height}
    </div>
  )
}

function Loading() {
  return <div>loading...</div>
}

function Submitting() {
  return <Loading />
}

function PhotoEditor({ target }) {
  return <div>Photo Editor {target.id}</div>
}

function TextEditor({ target }) {
  return (
    <div>
      <textarea
        style={{ width: '100%', maxWidth: '720px', boxSizing: 'border-box' }}
        rows="4"
        cols="1"
        defaultValue={target.text}
        onChange={(e) => {
          target.text = e.target.value
          target.canvas.requestRenderAll()
        }}
      />
    </div>
  )
}

export function createApp(appRoot) {
  const root = appRoot || document.createElement('div')
  root.setAttribute('id', 'personalize-app')

  const reactRoot = createRoot(root)

  function render(detail = {}) {
    if (!root.isConnected) throw new Error('App must be mount before use')

    if (detail.state === 'LOADING') {
      return reactRoot.render(<Loading />)
    }

    if (detail.state === 'SUBMITTING') {
      return reactRoot.render(<Submitting />)
    }

    if (detail.state === 'LOADED') {
      const { background, masks, texts } = detail

      let module

      switch (detail.module) {
      case 'Photo':
        module = <PhotoEditor key={detail.target.id} target={detail.target} />
        break

      case 'Text':
        module = <TextEditor key={detail.target.id} target={detail.target} />
        break

      default:
        module = <Info key={detail.background.id} background={background} masks={masks} texts={texts} />
        break
      }

      return reactRoot.render(
        <React.StrictMode>
          {module}
        </React.StrictMode>
      )
    }

    throw new Error('Unknown state ' + detail.state)
  }

  function mount() {
    document.body.appendChild(root)
  }

  mount()

  return { mount, render }
}
