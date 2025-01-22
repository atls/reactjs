import type { UiNode }       from '@ory/client'
import type { ReactElement } from 'react'

import { useCallback }       from 'react'

import { useFlowNode }       from '../hooks'
import { useValue }          from '../hooks'

type OnChangeCallback = (event: Date | boolean | number | string) => void

export interface FlowNodeProps {
  name: string
  children: (node: UiNode, value: string, callback: OnChangeCallback) => ReactElement
}

export const FlowNode = ({ name, children }: FlowNodeProps): ReactElement | null => {
  const node = useFlowNode(name)
  const [value, setValue] = useValue(name)

  const onChange = useCallback(
    (event: Date | boolean | number | string) => {
      setValue(event)
    },
    [setValue]
  )

  if (node && typeof children === 'function') {
    return children(node, value, onChange)
  }

  return null
}
