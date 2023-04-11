export {
 ...Object.prototype
}

export function reduce(init, arrLike, reducer) {
  return arrLike.reduce(reducer, init)
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
