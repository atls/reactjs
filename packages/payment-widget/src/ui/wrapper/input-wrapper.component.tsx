import { FC }                from 'react'
import { useContext }        from 'react'
import { useIntl }           from 'react-intl'

import { InputWrapperProps } from '../../interfaces'
import { FormContext }       from '../form.component'
import { useFieldsState }    from '../../hooks'
import { translate }         from '../../utils/translate.util'

export const InputWrapper: FC<InputWrapperProps> = ({ name, children }) => {
  const { errors, validateField } = useContext(FormContext)
  const { fieldsState, handleChange, handleBlur } = useFieldsState(validateField)
  const intl = useIntl()
  const translateError = translate(intl, errors[name], errors[name])

  if (typeof children === 'function') {
    return children(fieldsState as string, handleChange, handleBlur, translateError)
  }

  return null
}
