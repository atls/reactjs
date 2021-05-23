import React         from 'react'
import { render }    from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Form }      from '../form'
import { FormField } from './form-field.component'

describe('form-field.component', () => {
  const fields = [{ name: 'name', type: 'text', placeholder: 'placeholder', value: '' }]

  it('without params', async () => {
    const { getByTestId } = render(
      <Form fields={fields}>
        <FormField name='name'>
          {(props, value, onChange) => (
            <input {...props} data-testid='name' value={value} onChange={onChange} />
          )}
        </FormField>
      </Form>
    )

    const formField = getByTestId('name')

    fireEvent.change(formField, { target: { value: 'value' } })

    expect(formField).toHaveAttribute('name', 'name')
    expect(formField).toHaveAttribute('type', 'text')
    expect(formField).toHaveAttribute('value', 'value')
    expect(formField).toHaveAttribute('placeholder', 'placeholder')
  })
})
