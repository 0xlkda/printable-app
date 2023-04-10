export function keys(object) {
  return Object.keys(object)
}

export function values(object) {
  return Object.values(object)
}

export function reduce(init, arrLike, reducer) {
  return arrLike.reduce(reducer, init)
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
