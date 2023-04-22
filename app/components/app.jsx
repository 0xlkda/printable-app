import React from 'react'

export function Loading() {
  return <div>loading...</div>
}

export function Submitting() {
  return <div>submitting...</div>
}

function PhotoEditor({ target }) {
  return <div>Photo Editor {target.id}</div>
}

function TextEditor({ target }) {
  function handleTextChanged(e) {
    const ok = () => e.target.style.removeProperty('color')
    const error = () => e.target.style.setProperty('color', 'red')
    target.fire('text:changed', { ok, error, value: e.target.value })
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  return (
    <div>
      <textarea
        style={{ height: 'auto', width: '100%', maxWidth: '720px', boxSizing: 'border-box', resize: 'none' }}
        rows={target.maxLines + 2}
        placeholder={target.defaultText}
        defaultValue={target.text}
        onInput={handleTextChanged}
      />
    </div>
  )
}

export default function App({ detail }) {
  let module

  switch (detail.module) {
  case 'Photo':
    module = <PhotoEditor key={detail.target.id} target={detail.target} />
    break

  case 'Text':
    module = <TextEditor key={detail.target.id} target={detail.target} />
    break

  default:
    module = <div>Click on design to edit</div>
    break
  }

  return (
    <React.StrictMode>
      <div className="personalize-app-editor">
        {module}
      </div>
    </React.StrictMode>
  )
}
