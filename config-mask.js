import COLORS from './colors'
import { clone, lockMovement, decorate, render } from './fabric-util'

const handPointer = (i) => i.set({ hoverCursor: 'pointer' })
const normalize = (i) => i.set({ fill: COLORS.primary, opacity: 0.1 })
const highlight = (i) => i.set({ fill: COLORS.primary, opacity: 0.5 })

export function applyMaskConfig(obj) {
  const item = clone(obj)
  decorate(item, [normalize, handPointer, lockMovement])

  item.on({
    'mouseover': e => render(highlight(e.target)),
    'mouseout': e => render(normalize(e.target)),
  })

  return item
}
