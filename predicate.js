export function isPhoto(input) {
  return input.id?.startsWith('mask-')
}

export function isText(input) {
  return input.id?.startsWith('text-')
}
