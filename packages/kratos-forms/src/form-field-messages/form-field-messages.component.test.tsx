import React                 from 'react'
import { render }            from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Form }              from '../form'
import { FormFieldMessages } from './form-field-messages.component'

describe('form-field-messages.component', () => {
  const fields = [{ name: 'message', type: 'text', messages: [{ id: 1, text: 'message' }] }]

  it('without params', async () => {
    const { getByText } = render(
      <Form fields={fields}>
        <FormFieldMessages name='message'>
          {(messages) => (
            <div>
              {messages.map((message) => (
                <div key={message.id}>{message.text}</div>
              ))}
            </div>
          )}
        </FormFieldMessages>
      </Form>
    )

    expect(getByText('message')).toBeInTheDocument()
  })
})
