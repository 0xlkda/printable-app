export { fabric } from 'fabric'
import { reduce } from '@/utils'

const clone = fabric.util.object.clone
const enlivenObjects = fabric.util.enlivenObjects
const createCanvas = options => new fabric.Canvas('', options)

// fabric alias & helpers
export {
  clone,
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

export function lockMovement(object) {
  object.set({
    lockMovementX: true,
    lockMovementY: true,
  })

  return object
}

export function decorate(target, rules) {
  return reduce(clone(target), rules, (target, rule) => rule(target))
}

export function render(object) {
  return object.canvas?.requestRenderAll()
}
