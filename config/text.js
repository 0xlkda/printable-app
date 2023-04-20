import { clone, lockMovement, decorate } from '@/libs/fabric'

const handPointer = (i) => i.set({ hoverCursor: 'pointer' })

export function applyTextConfig(obj) {
  const item = clone(obj)
  decorate(item, [handPointer, lockMovement])

  return item
}
