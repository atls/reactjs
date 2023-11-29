import { ReactNode }      from 'react'
import { isValidElement } from 'react'

import { Field }          from '../interfaces'

export const getNameFields = (customFields: ReactNode[]) =>
  customFields.reduce<Field[]>((acc, field) => {
    if (isValidElement(field))
      acc.push({
        name: field.props.name,
      })
    return acc
  }, [])
