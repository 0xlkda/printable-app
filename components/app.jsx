import React from 'react'
import { createRoot } from 'react-dom/client'
import Personalize from './personalize'

function Loading() {
  return <div>loading...</div>
}

function Submitting() {
  return <Loading />
}

export function createApp() {
  const root = document.getElementById('personalize-app') || document.createElement('div')
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

      return reactRoot.render(
        <React.StrictMode>
          <Personalize
            background={background}
            masks={masks}
            texts={texts}
          />
        </React.StrictMode>
      )
    }

    throw new Error('Unknown state ' + detail.state)
  }

  function mount() {
    document.body.appendChild(root)
  }

  return { mount, render }
}
