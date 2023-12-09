import { FunctionComponent }    from 'react'
import { ReactNode }            from 'react'
import { isValidElement }       from 'react'

import { NameWrapperComponent } from '../enums'

export const isCustomElement = (nameNode: NameWrapperComponent, node: ReactNode): boolean =>
  isValidElement(node) && typeof node.type === 'function'
    ? (node.type as FunctionComponent).displayName === nameNode &&
      typeof node.props.children === 'function'
    : false
