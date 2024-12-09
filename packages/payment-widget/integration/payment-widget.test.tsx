import assert from 'node:assert/strict'
import { it } from 'node:test'
import { describe } from 'node:test'

import { Input } from '@atls-ui-parts/input'
import { Box } from '@atls-ui-parts/layout'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/react'
import React from 'react'

import { LanguagesType } from '../src/index.js'
import { Widget } from '../src/index.js'
import { InputWrapper } from '../src/index.js'
import { ButtonWrapper } from '../src/index.js'
import { AdditionalFieldsType } from '../src/index.js'

const Form = (
  <Widget
    settings={{ storeId: 'tinkoffTest', language: LanguagesType.RUSSIAN }}
  >
    <InputWrapper name={AdditionalFieldsType.Name}>
      {(props) => (
        <Box flexDirection="column">
          <Input {...props} placeholder="Name" />
        </Box>
      )}
    </InputWrapper>
    <InputWrapper name={AdditionalFieldsType.Email}>
      {(props) => (
        <Box flexDirection="column">
          <Input {...props} placeholder="Email" />
        </Box>
      )}
    </InputWrapper>
    <InputWrapper name={AdditionalFieldsType.Phone}>
      {(props) => (
        <Box flexDirection="column">
          <Input {...props} placeholder="Phone" />
        </Box>
      )}
    </InputWrapper>
  </Widget>
)

describe('Payment Widget', () => {
  it('render', async () => {
    render(Form)

    const button = await screen.findByRole('button')
    console.debug(button)
    assert.equal()
  })
})
