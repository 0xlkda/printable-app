import { createUserCommands } from './user-commands'
import { createAppEvents } from './app-events'
import { createDisplayCommands } from './display-commands'
import { createCanvasCommands } from './canvas-commands'

export function createContext(manager) {
  const AppEvents = createAppEvents(manager)
  const UserCommands = createUserCommands(manager)
  const DisplayCommands = createDisplayCommands(manager)
  const CanvasCommands = createCanvasCommands(manager)

  return {
    AppEvents,
    UserCommands,
    DisplayCommands,
    CanvasCommands,
  }
}
