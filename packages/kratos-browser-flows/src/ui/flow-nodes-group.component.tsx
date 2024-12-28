import type { UiNode }       from '@ory/kratos-client'
import type { ReactElement } from 'react'
import type { FC }           from 'react'

import { useFlow }           from '../providers'

export interface FlowNodesGroupProps {
  name: string
  children: (node: Array<UiNode>) => ReactElement
}

export const FlowNodesGroup: FC<FlowNodesGroupProps> = ({ name, children }) => {
  const flow = useFlow()

  const nodes = flow.getNodesGroup(name)

  if (typeof children === 'function') {
    return children(nodes)
  }

  return null
}
