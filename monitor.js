import { keys } from './util'

export function Monitor(manager, brief) {
  const listeners = []
  const events = keys(brief)

  events.forEach(event => {
    const listener = manager.on(event, async (e) => {
      const handlers = brief[event] ??= []
      for (const handle of handlers) {
        if (handle.constructor.name === 'AsyncFunction') {
          await handle(e.detail)
        } else {
          handle(e.detail)
        }
      }
    })

    listeners.push(listener)
  })

  return () => {
    listeners.forEach(off => off())
  }
}
