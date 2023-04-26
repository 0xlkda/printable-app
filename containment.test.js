import { fabric } from 'fabric'

const isPoint = object => object.kind === 'point'

function showBoundary(canvas) {
  canvas.on('after:render', () => {
    canvas.contextContainer.lineWidth = 5
    canvas.forEachObject(function(obj) {
      const bound = obj.getBoundingRect()
      canvas.contextContainer.strokeStyle = 'red'
      canvas.contextContainer.strokeRect(
        bound.left + 0.5,
        bound.top + 0.5,
        bound.width,
        bound.height
      )
    })
  })
}

const canvasEl = document.createElement('canvas')
canvasEl.id = 'fabric-canvas'
canvasEl.style.cssText = 'border: 1px solid black;'
document.body.appendChild(canvasEl)

globalThis.canvas = new fabric.Canvas('fabric-canvas', {
  width: 500,
  height: 500,
  selection: false,
  preserveObjectStacking: true
})

function setCoords(e) {
  e.target.setCoords()
}

canvas.on({
  'object:modified': setCoords,
  'object:rotated': setCoords,
  'object:scaled': setCoords,
  'object:moved': setCoords,
})

function calcDistance(point1, point2) {
  const dx = Math.abs(point1.x - point2.x)
  const dy = Math.abs(point1.y - point2.y)
  return Math.hypot(dx, dy)
}

function create(type, args) {
  const live = new fabric[type](args)
  live.fill = 'green'
  live.setColor = color => live.set('fill', color)
  live.setOpacity = value => live.set('opacity', value)
  live.setAngle = degree => {
    live.set('angle', degree)
    live.setCoords()
  }

  canvas.add(live)
  return live
}

function makeCircle({ center, radius }) {
  const circle = create('Circle', {
    x: center.x,
    y: center.y,
    radius,
  })

  circle.setPositionByOrigin(center, 'center', 'center')

  return circle
}

function makeRect({ width, height }) {
  const rect = create('Rect', { width, height })
  return rect
}

function makeCircleOuter(rect) {
  const center = rect.getCenterPoint()
  const rectTopLeftPoint = rect.getCoords()[0]
  const radius = calcDistance(center, rectTopLeftPoint)
  const circle = makeCircle({ center, radius })
  circle.setPositionByOrigin(center, 'center', 'center')
  circle.evented = false
  circle.selectable = false

  // make a bound
  rect.bringToFront()
  rect.on('moving', (e) => {
    const center = rect.getCenterPoint()
    circle.setPositionByOrigin(center, 'center', 'center')
    circle.setCoords()
    circle.fire('moving', e)
  })

  return circle
}

function makeCircleInner(rect) {
  const center = rect.getCenterPoint()
  const rectTopLeftPoint = rect.getCoords()[0]
  const rectTopRightPoint = rect.getCoords()[1]
  const radius = calcDistance(rectTopLeftPoint, rectTopRightPoint) / 2
  const circle = makeCircle({ center, radius })
  circle.setPositionByOrigin(center, 'center', 'center')
  circle.evented = false
  circle.selectable = false

  // make a bound
  rect.on('moving', (e) => {
    const center = rect.getCenterPoint()
    circle.setPositionByOrigin(center, 'center', 'center')
    circle.setCoords()
    circle.fire('moving', e)
  })

  return circle
}

function makeLine(point1, point2) {
  const line = create('Line', [point1.x, point1.y, point2.x, point2.y])
  line.stroke = 'lime'
  line.strokeWidth = 2
  return line
}

function makeText(string) {
  const text = create('Text', string)
  return text
}

function checkCollision(max) {
  return (left, right) => {
    const centerL = left.getCenterPoint()
    const centerR = right.getCenterPoint()
    const delta = parseFloat((calcDistance(centerL, centerR) - max).toFixed(2))

    if (delta > 0) {
      return 'NOT COLLIDED'
    }

    if (delta === 0) {
      return 'TOUCHED'
    }

    if (delta < 0) {
      return 'COLLIDED'
    }
  }
}

function connectCenterPoints(left, right, callback) {
  const line = makeLine(left.getCenterPoint(), right.getCenterPoint())
  line.evented = false
  line.selectable = false
  line.setColor('blue')

  const MAX_DISTANCE = calcDistance(left.getCenterPoint(), right.getCenterPoint())
  const check = checkCollision(MAX_DISTANCE)

  left.on('moving', () => {
    const center = left.getCenterPoint()
    line.set('x1', center.x)
    line.set('y1', center.y)
    line.setCoords()
    callback(check(left, right))
  })

  right.on('moving', () => {
    const center = right.getCenterPoint()
    line.set('x2', center.x)
    line.set('y2', center.y)
    line.setCoords()
    callback(check(left, right))
  })
}

const rect = makeRect({ width: 100, height: 150 })
rect.center()
rect.setColor('black')
rect.setAngle(30)

const mousePointer = makeText('')

canvas.on('mouse:move', (e) => {
  mousePointer.set('text', `${e.pointer.x.toFixed(0)} ${e.pointer.y.toFixed(0)}`)
  canvas.requestRenderAll()
})

canvas.on('mouse:down', () => {
  console.clear()
  canvas.getObjects().filter(isPoint).forEach(canvas.remove.bind(canvas))
})

canvas.on('mouse:up', (e) => {
  makePoint(e.pointer, 'yellow')
  isPointInPolygon(e.pointer, rect)
    ? rect.setColor('green')
    : rect.setColor('black')
})

// const rect2 = makeRect({ width: 200, height: 250 })
// rect2.setOpacity(.2)
// rect2.setColor('black')
// rect2.on('modified', () => {
//   const results = rect.getCoords().map(point => {
//     return isPointInPolygon(point, rect2)
//   })
//
//   if (results.every(test => test === true)) {
//     rect.setColor('green')
//   } else {
//     rect.setColor('black')
//   }
// })

function makePoint(point, color = 'lime') {
  const p = makeCircle({ center: point, radius: 5 })
  p.kind = 'point'
  p.setColor(color)
  return p
}

function getCornerLabel(index) {
  switch (index) {
  case 0:
    return 'TL'
  case 1:
    return 'TR'
  case 2:
    return 'BR'
  case 3:
    return 'BL'
  default:
    return 'UNKNOWN'
  }
}

function isPointInPolygon(point, polygon) {
  let contained = false
  let i, j

  const currentY = point.y
  const currentX = point.x
  const points = polygon.getCoords()
  const numberOfPoints = points.length

  for (i = 0, j = numberOfPoints - 1; i < numberOfPoints; j = i++) {
    makePoint(points[i])

    const firstPoint = points[i]
    const secondPoint = points[j]

    const pointIsBelowFirstPoint = firstPoint.y >= currentY
    const pointIsBelowSecondPoint = secondPoint.y >= currentY

    const DXBetweenTwoPoints = secondPoint.x - firstPoint.x
    const DYBetweenTwoPoints = secondPoint.y - firstPoint.y

    const DYBetweenCurrentAndFirstPoint = currentY - firstPoint.y
    const firstPointX = firstPoint.x

    const pointIsBetween = pointIsBelowFirstPoint !== pointIsBelowSecondPoint
    const conditionTwo = currentX <= DYBetweenCurrentAndFirstPoint * DXBetweenTwoPoints / DYBetweenTwoPoints + firstPointX

    if (pointIsBetween && conditionTwo) {
      contained = !contained
    }

    const detail = {
      [`point.y is between ${getCornerLabel(i)} and ${getCornerLabel(j)}`]: `${pointIsBetween}`,
      [`point.x <= DistanceY[point.y_${getCornerLabel(i)}.y] * DistanceX[${getCornerLabel(j)}_${getCornerLabel(i)}] / DistanceY[${getCornerLabel(j)}_${getCornerLabel(i)}] + ${getCornerLabel(i)}.x`]: `${conditionTwo}`,
      'accumulate contained': contained,
    }

    console.log(JSON.stringify(detail, null, 2))
    console.log(`${'point.x'.padEnd(18)} <= DistanceY[point.y_${getCornerLabel(i)}.y] * DistanceX[${getCornerLabel(j)}_${getCornerLabel(i)}] / DistanceY[${getCornerLabel(j)}_${getCornerLabel(i)}] + ${getCornerLabel(i)}.x`)
    console.log(`${currentX} <= ${DYBetweenCurrentAndFirstPoint} * ${DXBetweenTwoPoints} / ${DYBetweenTwoPoints} + ${firstPointX}`)
    console.log(`${currentX} <= ${DYBetweenCurrentAndFirstPoint * DXBetweenTwoPoints / DYBetweenTwoPoints + firstPointX}`, conditionTwo)
  }


  console.log('RESULT:', contained)
  return contained
}
