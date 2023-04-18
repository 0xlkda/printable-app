export const keys = Object.keys
export const values = Object.values

export function noop() { }

export function debounce(callback, delay) {
  let timeout
  return () => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(callback, delay)
  }
}

export function interval(callback, delay) {
  const timerId = setInterval(callback, delay)
  return () => clearInterval(timerId)
}

export function unique(arrayLike) {
  return Array.from(new Set(arrayLike))
}

export function reduce(init, arrLike, reducer) {
  return Array.from(arrLike).reduce(reducer, init)
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function encode(string) {
  if (decodeURI(string) === string) return encodeURI(string)
  return encode(decodeURI(string))
}

export function orientationChanged() {
  const FIRST = 0
  const MAX_FRAMES = 120 // Wait until innerheight changes, or max 120 frames

  return new Promise((resolve) => {
    const next = (frame, height0) => {
      window.innerHeight != height0 || frame >= MAX_FRAMES
        ? resolve()
        : window.requestAnimationFrame(() => next(frame + 1, height0))
    }
    next(FIRST, window.innerHeight)
  })
}
