import { debounce } from '@/utils'

const slow = 1000 / 30 // 30fps
const fast = 1000 / 60 // 60fps
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
const DELTA = mediaQuery.matches ? slow : fast

function debounceWindowEvent(event, handle, delay = DELTA) {
  window.addEventListener(event, debounce(handle, delay), false)
}

export function debounceResize(callback, delay = DELTA) {
  debounceWindowEvent('resize', () => requestAnimationFrame(callback), delay)
}

export function debounceScroll(callback, delay = DELTA) {
  debounceWindowEvent('scroll', () => requestAnimationFrame(callback), delay)
}
