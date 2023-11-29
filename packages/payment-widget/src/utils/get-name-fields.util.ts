import { ReactNode }            from 'react'
import { isValidElement }       from 'react'

import { AdditionalFieldsType } from '../enums'
import { RequiredFieldsType }   from '../enums'
import { Field }                from '../interfaces'

export const getNameFields = (customFields: ReactNode[]) =>
  customFields.reduce<Field[]>((acc, field) => {
    if (isValidElement(field))
      acc.push({
        name: AdditionalFieldsType[field.props.name] || RequiredFieldsType[field.props.name],
      })
    return acc
  }, [])
