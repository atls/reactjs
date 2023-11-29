import { Condition }         from '@atls-ui-parts/condition'

import React                 from 'react'
import { FC }                from 'react'
import { useIntl }           from 'react-intl'

import { InputWrapperProps } from '../../interfaces'
import { translate }         from '../../utils/translate.util'
import { useForm }           from '../form'

export const InputWrapper: FC<InputWrapperProps> = ({ name, children }) => {
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
