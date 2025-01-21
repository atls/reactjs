import type { UiNodeImageAttributes } from '@ory/client'
import type { UiNode }                from '@ory/client'
import type { ReactElement }          from 'react'

import { UiNodeTypeEnum }             from '@ory/client'

import { useFlowNode }                from '../hooks'

export interface FlowUiImageNode extends Omit<UiNode, 'attributes'> {
  attributes: UiNodeImageAttributes
}

export interface FlowImageNodeProps {
  name: string
  children: (node: FlowUiImageNode) => ReactElement
}

export const FlowImageNode = ({ name, children }: FlowImageNodeProps): ReactElement | null => {
  const node = useFlowNode(name)

  if (node && node.type === UiNodeTypeEnum.Img && typeof children === 'function') {
    return children(node as FlowUiImageNode)
  }

  return null
}
