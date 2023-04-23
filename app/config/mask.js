import { fabric, render, decorate, lockMovement, createControl, setDragBoundary } from '@/libs/fabric'
import { createImg } from '@/libs/browser'
import COLORS from '@/app/assets/colors'
import ICONS from '@/app/assets/icons'
import UserCommands from '@/user/commands'
import AppCommands from '@/app/commands'

const IMAGE_COVER_RATIO = 1.2

const handPointer = (mask) => mask.set({ hoverCursor: 'pointer' })
const clickable = (mask) => mask.set({ fill: COLORS.primary, opacity: 0.1 })
const highlight = (mask, opacity = 0.5) => mask.set({ fill: COLORS.primary, opacity })
const absolutePositioned = (mask) => mask.set({ absolutePositioned: true })

const handleMouseOut = (mask) => () => render(clickable(mask))
const handleMouseOver = (mask) => () => render(highlight(mask))

function enableMouseOver(mask) {
  mask.on('mouseover', handleMouseOver(mask))
  mask.on('mouseout', handleMouseOut(mask))
  return mask
}

function disableMouseOver(mask) {
  mask.off('mouseover')
  mask.off('mouseout')
  return mask
}

function toFulfilled(mask, image) {
  mask.set('image', image)
  mask.set('evented', false)
  mask.set('selectable', false)
}

function reset(mask) {
  mask.canvas.remove(mask.image)
  mask.set('image', null)
  mask.set('evented', true)
  mask.set('selectable', true)
}

export function applyMaskConfig(obj) {
  const mask = decorate(obj, [clickable, handPointer, lockMovement, absolutePositioned])
  const getCanvas = () => mask.canvas

  // helpers
  mask.reset = reset.bind(null, mask)
  mask.toFulfilled = toFulfilled.bind(null, mask)

  // events setup 
  enableMouseOver(mask)

  function handleSelected() {
    UserCommands.SELECT_MASK(mask)
    disableMouseOver(mask)
    render(highlight(mask))
  }

  function handleDeselected() {
    AppCommands.DISPLAY_APP({ state: 'LOADED' })
    enableMouseOver(mask)
    render(clickable(mask))
  }

  function handlePhotoUploaded({ photoUrl }) {
    mask.reset()

    fabric.Image.fromURL(photoUrl, (image) => {
      const canvas = getCanvas()
      const scale = fabric.util.findScaleToCover(image, mask) * IMAGE_COVER_RATIO

      image.scale(scale)
      image.set('clipPath', mask)
      image.setPositionByOrigin(mask.getCenterPoint(), 'center', 'center')
      image.controls.tr = createControl({
        name: 'Delete_' + mask.id,
        icon: createImg(ICONS.deleteIcon),
        size: 150,
        handler: (_, transform) => {
          const mask = transform.target.clipPath
          const image = transform.target
          canvas.remove(image)
          mask.reset()
        }
      })

      // enforce mask within image
      setDragBoundary(image, mask)

      canvas.add(image)
      canvas.setActiveObject(image)

      mask.toFulfilled(image)
    })
  }

  mask.on({
    'selected': handleSelected,
    'deselected': handleDeselected,
    'photo:uploaded': handlePhotoUploaded
  })

  return mask
}
