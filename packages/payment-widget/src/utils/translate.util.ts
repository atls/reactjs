import { IntlShape } from 'react-intl'

export const translate = (intl: IntlShape, messageId: string, defaultMessage: string) =>
  intl.messages[messageId] ? intl.formatMessage({ id: messageId }) : defaultMessage
