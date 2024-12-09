import type { ReactNode }       from 'react'

import { NameWrapperComponent } from '../enums/index.js'
import { isCustomElement }      from '../utils/index.js'

export const useCustomButton = (nodeArray: Array<ReactNode>): ReactNode =>
  nodeArray.find((node) => isCustomElement(NameWrapperComponent.ButtonWrapper, node))
