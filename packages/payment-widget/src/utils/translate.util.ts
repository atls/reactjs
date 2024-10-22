import type { IntlShape } from 'react-intl'

export const translate = (intl: IntlShape, messageId: string, defaultMessage: string): string =>
  intl.messages[messageId] ? intl.formatMessage({ id: messageId }) : defaultMessage
