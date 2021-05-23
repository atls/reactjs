import { useMemo }        from 'react'
import { useState }       from 'react'
import { useCallback }    from 'react'
import { FormEvent }      from 'react'
import { FC }             from 'react'

import { FormFieldProps } from './form-field.interfaces'
import { useForm }        from '../form'

export const FormField: FC<FormFieldProps> = ({ name, children }) => {
  const form = useForm()

  if (!form) {
    throw new Error('Missing <FormProvider>')
  }

  const [value, setValue] = useState(form.getValue(name))

  const onChange = useCallback(
    (event: FormEvent<HTMLInputElement> | string | any) => {
      if (event && event.target) {
        setValue(event.target.value)
      } else {
        setValue(event)
      }
    },
    [setValue]
  )

  const field = useMemo(() => form.getField(name), [name, form])

  if (field && typeof children === 'function') {
    return children(field, value, onChange)
  }

  return null
}
