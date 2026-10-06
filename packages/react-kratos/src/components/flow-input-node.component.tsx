import type { UiNodeInputAttributes } from '@ory/kratos-client-fetch'
import type { UiNode }                from '@ory/kratos-client-fetch'
import type { ReactElement }          from 'react'

import { UiNodeTypeEnum }             from '@ory/kratos-client-fetch'
import { useEffect }                  from 'react'
import { useCallback }                from 'react'

import { useFlowNode }                from '../hooks/index.js'
import { useValue }                   from '../hooks/index.js'

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
  }, [defaultValue])

  const onChange = useCallback(
    (event: Date | boolean | number | string) => {
      setValue(event)
    },
    [setValue]
  )

  if (node?.type === UiNodeTypeEnum.Input && typeof children === 'function') {
    return children(node as FlowUiInputNode, value, onChange)
  }

  return null
}
