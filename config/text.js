import { decorate, lockMovement } from '@/libs/fabric'

const handPointer = (i) => i.set({ hoverCursor: 'pointer' })

export function applyTextConfig(obj) {
  const item = decorate(obj, [handPointer, lockMovement])
  item.on('selected', () => item.notify())
  return item
}
