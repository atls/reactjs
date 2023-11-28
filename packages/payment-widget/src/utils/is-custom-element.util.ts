import { ReactNode }             from 'react'
import { JSXElementConstructor } from 'react'
import { isValidElement }        from 'react'

import { NameWrapperComponent }  from '../enums'

export const isCustomElement = (nameNode: NameWrapperComponent, node: ReactNode): boolean =>
  isValidElement(node)
    ? (node.type as JSXElementConstructor<any>).name === nameNode &&
      typeof node.props.children === 'function'
    : false
