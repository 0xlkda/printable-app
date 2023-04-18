import { clone, lockMovement, decorate } from './fabric-util'

const handPointer = (i) => i.set({ hoverCursor: 'pointer' })

export function applyTextConfig(obj) {
  const item = clone(obj)
  decorate(item, [handPointer, lockMovement])

  return item
}
