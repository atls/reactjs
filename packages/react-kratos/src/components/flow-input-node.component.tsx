import type { UiNodeInputAttributes } from '@ory/client'
import type { UiNode }                from '@ory/client'
import type { ReactElement }          from 'react'

import { UiNodeTypeEnum }             from '@ory/client'
import { useEffect }                  from 'react'
import { useCallback }                from 'react'

import { useFlowNode }                from '../hooks'
import { useValue }                   from '../hooks'

type OnChangeCallback = (event: Date | boolean | number | string) => void

export interface FlowUiInputNode extends Omit<UiNode, 'attributes'> {
  attributes: UiNodeInputAttributes
}

export interface FlowInputNodeProps {
  name: string
  defaultValue?: string
  children: (node: FlowUiInputNode, value: string, callback: OnChangeCallback) => ReactElement
}

export const FlowInputNode = ({
  name,
  defaultValue,
  children,
}: FlowInputNodeProps): ReactElement | null => {
  const node = useFlowNode(name)
  const [value, setValue] = useValue(name)

  useEffect(() => {
    if (!value && defaultValue) {
      setValue(defaultValue)
    }
  }, [defaultValue]) // eslint-disable-line react-hooks/exhaustive-deps

  const onChange = useCallback(
    (event: Date | boolean | number | string) => {
      setValue(event)
    },
    [setValue]
  )

  if (node && node.type === UiNodeTypeEnum.Input && typeof children === 'function') {
    return children(node as FlowUiInputNode, value, onChange)
  }

  return null
}
