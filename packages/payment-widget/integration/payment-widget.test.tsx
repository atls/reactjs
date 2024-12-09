import 'global-jsdom/register'

import assert                   from 'node:assert/strict'
import { it }                   from 'node:test'
import { describe }             from 'node:test'

import { render }               from '@testing-library/react'
import { fireEvent }            from '@testing-library/react'
import React                    from 'react'

import { LanguagesType }        from '../src/index.js'
import { Widget }               from '../src/index.js'
import { InputWrapper }         from '../src/index.js'
import { AdditionalFieldsType } from '../src/index.js'

const Form = (
  <Widget settings={{ storeId: 'tinkoffTest', language: LanguagesType.RUSSIAN }} amount={1000}>
    <InputWrapper name={AdditionalFieldsType.Phone}>
      {(props) => <input {...props} placeholder='Phone' />}
    </InputWrapper>
  </Widget>
)

describe('Payment Widget', () => {
  it('render', async () => {
    const body = render(Form)

    const button = await body.findByRole('button')

    fireEvent.click(button)

    assert.ok(button.innerHTML)
  })
})
