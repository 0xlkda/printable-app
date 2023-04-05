import { sendRequest } from 'medkit'

export async function getProduct(url) {
  return sendRequest({ url, expectMessage: 'Product not found' })
}
