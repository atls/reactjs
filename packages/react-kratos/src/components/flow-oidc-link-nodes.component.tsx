import type { UiNodeInputAttributes } from '@ory/client'
import type { ReactElement }          from 'react'

import type { FlowUiInputNode }       from './flow-input-node.component'

import { useMemo }                    from 'react'

import { useFlow }                    from '../hooks'

export interface FlowOidcLinkNodesProps {
  children: (nodes: Array<FlowUiInputNode>) => ReactElement
}

export const FlowOidcLinkNodes = ({ children }: FlowOidcLinkNodesProps): ReactElement | null => {
  const { flow } = useFlow()

  const nodes = useMemo(
    () =>
      flow?.ui?.nodes?.filter(
        (node) =>
          node.group === 'oidc' && (node.attributes as UiNodeInputAttributes).name === 'link'
      ),
    [flow]
  )

  if (!(nodes && nodes.length > 0)) {
    return null
  }

  if (typeof children === 'function') {
    return children(nodes as Array<FlowUiInputNode>)
  }

  return children as ReactElement
}
