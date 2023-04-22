import { fabric } from 'fabric'
import { reduce } from '@/utils'

const enlivenObjects = fabric.util.enlivenObjects
const createCanvas = (options) => new fabric.Canvas('', options)

// fabric alias & helpers
export {
  fabric,
  enlivenObjects,
  createCanvas
}

function createOutlineSettings(types) {
  return (value) => types.forEach(type => {
    type.prototype.set({
      controls: false,
      padding: value,
      borderScaleFactor: value,
    })
  })
}

export function setBorderWidth(value) {
  const apply = createOutlineSettings([fabric.Object, fabric.Textbox])
  return apply(value)
}

export function lockMovement(target) {
  target.set({
    lockMovementX: true,
    lockMovementY: true,
  })

  return target
}

export function disableEdit(target) {
  return target.set('editable', false)
}

export function decorate(target, rules) {
  return reduce(target, rules, (target, rule) => rule(target))
}

export function render(target) {
  return target.canvas?.requestRenderAll()
}
