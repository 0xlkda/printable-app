import { fabric } from 'fabric'
import { reduce } from './util'

export const clone = fabric.util.object.clone

export function lockMovement(object) {
  object.set({
    lockMovementX: true,
    lockMovementY: true,
  })

  return object
}

export function decorate(target, rules) {
  return reduce(target, rules, (target, rule) => rule(target))
}

export function render(object) {
  return object.canvas?.requestRenderAll()
}
