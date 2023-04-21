import React from 'react'
import { createRoot } from 'react-dom/client'
import App, { Loading, Submitting } from '@/app/components/app'


export function createApp({ rootId }) {
  const root = document.getElementById(rootId)
  const reactRoot = createRoot(root)

  function render(detail = {}) {
    if (!root.isConnected) throw new Error('App must be mount before use')

    switch (detail.state) {
    case 'LOADING':
      reactRoot.render(React.createElement(Loading))
      break

    case 'SUBMITTING':
      reactRoot.render(React.createElement(Submitting))
      break

    case 'LOADED':
      reactRoot.render(React.createElement(App, { detail }))
      break

    default:
      throw new Error('Unknown state ' + detail.state)
    }
  }

  return {
    root,
    render
  }
}
