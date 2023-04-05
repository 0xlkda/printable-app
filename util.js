export function keys(object) {
  return Object.keys(object)
}

export function values(object) {
  return Object.values(object)
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
