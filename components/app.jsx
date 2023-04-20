import React from 'react'

export function Loading() {
  return <div>loading...</div>
}

export function Submitting() {
  return <Loading />
}

function Info({ background, masks, texts }) {
  return (
    <div>
      hello {masks.length} {texts.length} {background.width} {background.height}
    </div>
  )
}

function PhotoEditor({ target }) {
  return <div>Photo Editor {target.id}</div>
}

function TextEditor({ target }) {
  return (
    <div>
      <textarea
        style={{ width: '100%', maxWidth: '720px', boxSizing: 'border-box', resize: 'vertical' }}
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

export default function App({ detail }) {
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

  return (
    <React.StrictMode>
      <div id="personalize-app-editor">
        {module}
      </div>
    </React.StrictMode>
  )
}

