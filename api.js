import { sendRequest } from 'medkit'
import { sleep } from './util'

export async function getProduct(url) {
  await sleep(750)
  return sendRequest({ url, expectMessage: 'Product not found' })
}
