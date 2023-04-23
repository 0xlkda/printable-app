import { fabric } from 'fabric'
import { keys, reduce } from '@/utils'

const clone = fabric.util.object.clone
const enlivenObjects = fabric.util.enlivenObjects
const createCanvas = (options) => new fabric.Canvas('', options)

// fabric alias & helpers
export {
  fabric,
  clone,
  enlivenObjects,
  createCanvas
}

export function shouldRenderControls(target, { whitelist } = { whitelist: [] }) {
  return whitelist.includes(target.type)
}

const alwaysHide = (i) => ['mt', 'mr', 'mb', 'ml', 'rt'].includes(i)

function scaleBorderAndControls(types, value) {
  types.forEach(type => {

    type.prototype.hideControls = toggleControls.bind(null, type.prototype, false)
    type.prototype.showControls = toggleControls.bind(null, type.prototype, true)

    // border & corners
    type.prototype.set({
      padding: value,
      borderScaleFactor: value,
      transparentCorners: false,
      cornerSize: value * 5,
      touchCornerSize: value * 5,
    })

    // rotating point offsetY
    type.prototype.controls.mtr.offsetY = -(value * 10)

    // hide all controls
    type.prototype.hideControls()
  })
}

function toggleControls(target, visibility) {
  keys(target.controls).forEach(control => {
    target.controls[control].setVisibility(alwaysHide(control) ? false : visibility)
  })

  target.canvas?.requestRenderAll()
}

export function setControl(target, position, control) {
  target.setControlsVisibility({ [position]: true })
  target.controls[position] = control
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
  return reduce(clone(target), rules, (target, rule) => rule(target))
}

export function render(target) {
  return target.canvas?.requestRenderAll()
}

export function renderIcon(icon, size) {
  return function(ctx, left, top, _, fabricObject) {
    ctx.save()
    ctx.translate(left, top)
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
    ctx.drawImage(icon, -size / 2, -size / 2, size, size)
    ctx.restore()
  }
}

export function createControl({ name, handler, icon, size }) {
  return new fabric.Control({
    actionName: name,
    x: 0.5,
    y: -0.5,
    offsetY: -16,
    offsetX: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: handler,
    render: renderIcon(icon, size),
  })
}

export function setCanvasDimensions(canvas, size) {
  const scaleFactor = Math.floor(size.width / 200)
  scaleBorderAndControls([fabric.Object, fabric.Textbox, fabric.Image], scaleFactor)

  canvas.setDimensions(size)
  canvas.setDimensions({
    width: '100%', maxWidth: '720px',
    height: 'auto', maxHeight: '720px'
  }, { cssOnly: true })
}

export function setDragBoundary(movingBox, fixBox) {
  const topBound = fixBox.top
  const bottomBound = topBound + fixBox.getScaledHeight()
  const leftBound = fixBox.left
  const rightBound = leftBound + fixBox.getScaledWidth()

  movingBox.on('moving', function() {
    const top = movingBox.top
    const left = movingBox.left
    movingBox.set('left', Math.max(Math.min(left, leftBound), rightBound - movingBox.getScaledWidth()))
    movingBox.set('top', Math.max(Math.min(top, topBound), bottomBound - movingBox.getScaledHeight()))
  })
}
