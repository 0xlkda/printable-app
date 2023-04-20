export function isBackground(input) {
  const likeLyBackground = input => input.id?.startsWith('Layer_1') && input.type?.startsWith('image')
  return input.id?.startsWith('background') || likeLyBackground(input)
}

export function isPath(input) {
  return input.type === 'path'
}

export function isMask(input) {
  return input.id?.startsWith('mask-')
}

export function isNotMask(input) {
  return !isMask(input)
}

export function isText(input) {
  return input.id?.startsWith('text-')
}
