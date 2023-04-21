import { createMessage } from '@/libs/monitor'

export default {
  OPEN_APP: createMessage('OPEN_APP'),
  SELECT_MASK: createMessage('SELECT_MASK'),
  SELECT_TEXT: createMessage('SELECT_TEXT'),
  SUBMIT: createMessage('SUBMIT'),
}
