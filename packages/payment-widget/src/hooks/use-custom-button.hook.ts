import type { ReactNode }       from 'react'

import { NameWrapperComponent } from '../enums'
import { isCustomElement }      from '../utils'

export const useCustomButton = (nodeArray: Array<ReactNode>): ReactNode =>
  nodeArray.find((node) => isCustomElement(NameWrapperComponent.ButtonWrapper, node))
