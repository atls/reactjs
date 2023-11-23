import { useContext }      from 'react'

import { FieldsValidator } from '../../interfaces'
import { Context }         from './form.context'

export const useForm = () => useContext(Context) as FieldsValidator
