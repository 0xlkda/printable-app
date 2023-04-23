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

export function createFontLoader(createUrl) {
  return ({ name, filename }) => new FontFace(name, `url(${createUrl(filename)})`)
}

export async function addFontsToDocument(api, fontNames) {
  const fonts = await api.getFonts(fontNames)
  const fontLoaders = fonts.map(createFontLoader(api.createFontURL))

  for (const loader of fontLoaders) {
    const fontface = await loader.load()
    if (!document.fonts.has(fontface)) {
      document.fonts.add(fontface)
    }
  }
}

export function createImg(src) {
  const img = document.createElement('img')
  img.src = src
  return img
}
