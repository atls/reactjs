import type { UiNodeInputAttributes } from '@ory/kratos-client-fetch'
import type { ReactElement }          from 'react'

import type { FlowUiInputNode }       from './flow-input-node.component.js'

import { useMemo }                    from 'react'

import { useFlow }                    from '../hooks/index.js'

export interface FlowTotpLinkNodesProps {
  children: (nodes: Array<FlowUiInputNode>) => ReactElement
}

export const FlowTotpLinkNodes = ({ children }: FlowTotpLinkNodesProps): ReactElement | null => {
  const { flow } = useFlow()

  const nodes = useMemo(
    () =>
      flow?.ui.nodes.filter(
        (node) =>
          node.group === 'totp' && (node.attributes as UiNodeInputAttributes).name === 'link'
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
