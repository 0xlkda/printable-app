import React from 'react'

export function Loading() {
  return <div>loading...</div>
}

export function Submitting() {
  return <div>submitting...</div>
}

function PhotoEditor({ target }) {
  function onFileSelected(e) {
    const file = e.target.files[0]
    target.fire('photo:uploaded', { photoUrl: URL.createObjectURL(file) })
  }

  return (
    <div style={{ maxWidth: '720px', maxHeight: '720px' }}>
      <label htmlFor={target.id}>Upload</label>
      <input
        hidden
        type="file"
        id={target.id}
        name={target.id}
        multiple={false}
        onChange={onFileSelected}
      />
    </div>
  )
}

function TextEditor({ target }) {
  function handleTextChanged(e) {
    const ok = () => e.target.style.removeProperty('color')
    const error = () => e.target.style.setProperty('color', 'red')
    target.fire('text:changed', { ok, error, value: e.target.value })

    if (e.target.offsetHeight < e.target.scrollHeight) {
      e.target.style.height = e.target.scrollHeight + 'px'
    }
  }

  return (
    <div>
      <textarea
        style={{ width: '100%', maxWidth: '720px', boxSizing: 'border-box', resize: 'vertical' }}
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
