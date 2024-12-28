import type { FC }                from 'react'

import type { InputWrapperProps } from '../../interfaces/index.js'

import { Condition }              from '@atls-ui-parts/condition'
import { useIntl }                from 'react-intl'
import React                      from 'react'

import { NameWrapperComponent }   from '../../enums/index.js'
import { translate }              from '../../utils/translate.util.js'
import { useForm }                from '../form/index.js'

const InputWrapper: FC<InputWrapperProps> = ({ name, children }) => {
  const { fieldsState, handleChange, handleBlur, errors } = useForm()
  const intl = useIntl()
  const translateError = translate(intl, errors[name], errors[name])

  return (
    <Condition match={typeof children === 'function'}>
      {children({
        name,
        value: fieldsState[name],
        onChangeNative: handleChange,
        onBlur: handleBlur,
        errorText: translateError,
      })}
    </Condition>
  )
}

InputWrapper.displayName = NameWrapperComponent.InputWrapper

export { InputWrapper }
