import { sendRequest } from 'medkit'
import { encode, sleep } from '@/utils'

const API_ENDPOINT = import.meta.env.VITE_APP_API_ENDPOINT
const CLOUDFRONT = import.meta.env.VITE_CLOUDFRONT

function getCloudfrontURL() {
  return CLOUDFRONT
}

export function createFontURL(filename) {
  return `${getCloudfrontURL()}/fonts/${encode(filename)}`
}

export async function getProduct(url) {
  await sleep(100)
  return sendRequest({ url, expectMessage: 'Product not found' })
}

export async function getFonts(fontNames) {
  const { fonts } = await sendRequest({
    url: `${API_ENDPOINT}/fonts`,
    method: 'POST',
    headers: {
      'content-type': 'text/plain;charset=UTF-8'
    },
    body: fontNames,
    expectMessage: 'Fonts not found',
  })

  return fonts
}
