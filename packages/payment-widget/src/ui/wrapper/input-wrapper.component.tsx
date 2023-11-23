import { FC }                from 'react'
import { useIntl }           from 'react-intl'

import { InputWrapperProps } from '../../interfaces'
import { useFieldsState }    from '../../hooks'
import { translate }         from '../../utils/translate.util'
import { useForm }           from '../form'

export const InputWrapper: FC<InputWrapperProps> = ({ name, children }) => {
  const { errors, validateField } = useForm()
  const { fieldsState, handleChange, handleBlur } = useFieldsState(validateField)
  const intl = useIntl()
  const translateError = translate(intl, errors[name], errors[name])

  if (typeof children === 'function') {
    return children(fieldsState as string, handleChange, handleBlur, translateError)
  }

  return null
}
