export const keys = Object.keys
export const values = Object.values

export function noop() {}

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
