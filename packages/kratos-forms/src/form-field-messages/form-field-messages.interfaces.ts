import { Message }      from '@ory/kratos-client'
import { ReactElement } from 'react'

export interface FormFieldMessagesProps {
  name: string
  children: (messages: Message[]) => ReactElement<any>
}
