import type { ReactNode } from 'react'

import type { Field }     from '../interfaces/index.js'

import { isValidElement } from 'react'

export const getNameFields = (customFields: Array<ReactNode>): Array<Field> =>
  customFields.reduce<Array<Field>>((acc, field) => {
    if (isValidElement(field))
      acc.push({
        name: field.props.name,
      })
    return acc
  }, [])
