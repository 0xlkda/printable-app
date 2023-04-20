import { createCommands as createAppCommands } from '@/commands/app'
import { reduce } from '@/utils'

function createMessage(handler, eventNames) {
  return reduce({}, eventNames, (events, eventName) => {
    events[eventName] = handler.lazyEmit(eventName)
    events[eventName].key = eventName
    return events
  })
}

export function createContext(manager) {
  const AppEvents = createMessage(manager, [
    'STARTED',
    'PRODUCT_LOADED',
    'PRODUCT_PERSONALIZE_SUBMITTED',
    'CANVAS_CREATED',
    'PHOTO_UPLOADED',
    'SHUT_DOWN'
  ])

  const UserCommands = createMessage(manager, [
    'SELECT_MASK',
    'SELECT_TEXT',
  ])

  const AppCommands = createAppCommands(manager)

  return {
    AppEvents,
    AppCommands,
    UserCommands
  }
}
