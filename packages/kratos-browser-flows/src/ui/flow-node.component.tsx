import type { UiNode }       from '@ory/kratos-client'
import type { ReactElement } from 'react'
import type { FC }           from 'react'
import type { FormEvent }    from 'react'

import { useMemo }           from 'react'
import { useState }          from 'react'
import { useCallback }       from 'react'

import { useFlow }           from '../providers'

// eslint-disable-next-line @typescript-eslint/sort-type-constituents
type OnChangeCallback = (event: string | FormEvent<HTMLInputElement>) => void

export interface FlowNodeProps {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (node: UiNode, value: any, callback: OnChangeCallback) => ReactElement
}

export const FlowNode: FC<FlowNodeProps> = ({ name, children }) => {
  const flow = useFlow()

  const node = useMemo(() => flow.getNode(name), [name, flow, flow.getState()])

  // eslint-disable-next-line react/hook-use-state
  const [value = '', setValue] = useState(flow.getValue(name))

  const onChange = useCallback(
    (event: FormEvent<HTMLInputElement> | string) => {
      if (typeof event === 'object' && 'value' in event.target && event.target.value) {
        setValue(event.target.value as string)
        flow.setValue(name, event.target.value as string)
      } else {
        setValue(event)
        flow.setValue(name, event as string)
      }
    },
    [name, flow, setValue]
  )

  if (node && typeof children === 'function') {
    return children(node, value, onChange)
  }

  return null
}
