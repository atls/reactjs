import { UiNode }       from '@ory/kratos-client'

import { ReactElement } from 'react'
import { FC }           from 'react'

import { useFlow }      from '../providers'

export interface FlowNodesGroupProps {
  name: string
  children: (node: Array<UiNode>) => ReactElement<any>
}

export const FlowNodesGroup: FC<FlowNodesGroupProps> = ({ name, children }) => {
  const flow = useFlow()

  const nodes = flow.getNodesGroup(name)

  if (typeof children === 'function') {
    return children(nodes as Array<UiNode>)
  }

  return null
}
