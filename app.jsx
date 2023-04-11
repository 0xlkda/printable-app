import React from 'react'
import { createRoot } from 'react-dom/client'
import Personalize from './personalize'

function App({ detail }) {
  const { photos, texts } = detail
  return <Personalize photos={photos} texts={texts} />
}

export function createApp() {
  const root = document.createElement('div')
  const reactRoot = createRoot(root)

  function render(detail = {}) {
    if (!root.isConnected) throw new Error('App must be mount before use')

    reactRoot.render(
      <React.StrictMode>
        <App detail={detail} />
      </React.StrictMode>
    )
  }

  function mount() {
    document.body.appendChild(root)
    render()
  }

  return [mount, render]
}
