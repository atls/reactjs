import type { UiNode }       from '@ory/client'
import type { ReactElement } from 'react'

import { useMemo }           from 'react'

import { useFlow }           from '../hooks'

export type FlowNodesGroupChildren = (node: Array<UiNode>) => ReactElement

export interface FlowNodesGroupProps {
  name: string
  children: FlowNodesGroupChildren | ReactElement
}

export const FlowNodesGroup = ({ name, children }: FlowNodesGroupProps): ReactElement | null => {
  const { flow } = useFlow()

  const nodes = useMemo(() => flow?.ui?.nodes?.filter((node) => node.group === name), [flow, name])

  if (!(nodes && nodes.length > 0)) {
    return null
  }

  if (typeof children === 'function') {
    return children(nodes)
  }

  return children
}
