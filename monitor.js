import { keys } from './util'

export function Monitor(manager, brief) {
  const listeners = []
  const events = keys(brief)

  events.forEach(event => {
    const listener = manager.on(event, (e) => {
      const handlers = brief[event]
      handlers?.forEach(handle => handle(e.detail))
    })

    listeners.push(listener)
  })

  return () => {
    listeners.forEach(off => off())
  }
}
