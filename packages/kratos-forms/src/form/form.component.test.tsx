import React       from 'react'
import { render }  from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { useForm } from './use-form.hook'
import { Form }    from './form.component'

describe('form.component', () => {
  const fields = [{ name: 'name', type: 'text', value: 'value' }]

  const FormFieldData = () => {
    const form = useForm()
    const value = form.getValue('name')
    const prop = form.getField('name')

    return <input data-testid='field' value={value} onChange={() => {}} {...prop} />
  }

  it('with fields', async () => {
    const { getByTestId } = render(
      <Form fields={fields}>
        <FormFieldData />
      </Form>
    )
    const form = getByTestId('field')

    expect(form).toHaveAttribute('name', 'name')
    expect(form).toHaveAttribute('type', 'text')
    expect(form).toHaveAttribute('value', 'value')
  })

  it('with action', async () => {
    const { getByTestId } = render(
      <Form data-testid='form' action='https://identity.atls.tech' />
    )

    expect(getByTestId('form')).toHaveAttribute('action', 'https://identity.atls.tech')
  })

  it('with method', async () => {
    const { getByTestId } = render(<Form data-testid='form' method='GET' />)

    expect(getByTestId('form')).toHaveAttribute('method', 'GET')
  })
})
