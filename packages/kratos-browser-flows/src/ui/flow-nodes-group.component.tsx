import { UiNode }       from '@ory/kratos-client'
import { ReactElement } from 'react'
import { FC }           from 'react'

import { useFlow }      from '../providers'

interface FlowUiNodeAttributes {
  disabled: boolean
  name: string
  pattern?: string
  required?: boolean
  type: string
  value?: any | null
  src: string
}

interface FlowUiNode extends Omit<UiNode, 'attributes'> {
  attributes: FlowUiNodeAttributes
}

export interface FlowNodesGroupProps {
  name: string
  children: (node: Array<FlowUiNode>) => ReactElement<any>
}

export const FlowNodesGroup: FC<FlowNodesGroupProps> = ({ name, children }) => {
  const flow = useFlow()

  const nodes = flow.getNodesGroup(name)

  if (typeof children === 'function') {
    return children(nodes as Array<FlowUiNode>)
  }

  return null
}
