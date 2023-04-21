import { createMessageBus } from 'medkit'
import { keys } from '@/utils'

const MessageBus = createMessageBus('message-manager', 'browser', { logEmit: true })

export function Monitor(brief, handleError) {
  const messages = keys(brief)
  const listeners = messages.map(message => {
    return MessageBus.on(message, async (e) => {
      const handlers = brief[message] ??= []
      for (const handle of handlers) {
        if (handle.constructor.name === 'AsyncFunction') {
          await handle(e.detail).catch(handleError)
        } else {
          handle(e.detail)
        }
      }
    })
  })
  return () => {
    listeners.forEach(off => off())
  }
}

export function createMessage(name, { instant } = { instant: false }) {
  const send = instant ? MessageBus.emit : MessageBus.lazyEmit
  const message = send.call(MessageBus, name)
  message.key = name
  return message
}
