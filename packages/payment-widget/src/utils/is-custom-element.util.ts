import type { FunctionComponent }    from 'react'
import type { ReactNode }            from 'react'

import type { NameWrapperComponent } from '../enums/index.js'

import { isValidElement }            from 'react'

export const isCustomElement = (nameNode: NameWrapperComponent, node: ReactNode): boolean =>
  isValidElement(node) && typeof node.type === 'function'
    ? (node.type as FunctionComponent).displayName === nameNode &&
      typeof node.props.children === 'function'
    : false
