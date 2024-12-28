import type { UiNode }       from '@ory/kratos-client'
import type { ReactElement } from 'react'
import type { FC }           from 'react'
import type { FormEvent }    from 'react'

import { useMemo }           from 'react'
import { useState }          from 'react'
import { useCallback }       from 'react'

import { useFlow }           from '../providers'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/sort-type-constituents
type OnChangeCallback = (event: string | FormEvent<HTMLInputElement> | any) => void

export interface FlowNodeProps {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  children: (node: UiNode, value: any | string, callback: OnChangeCallback) => ReactElement
}

export const FlowNode: FC<FlowNodeProps> = ({ name, children }) => {
  const flow = useFlow()

  // eslint-disable-next-line
  const node = useMemo(() => flow.getNode(name), [name, flow, flow.getState()])

  // eslint-disable-next-line react/hook-use-state
  const [value = '', setValue] = useState(flow.getValue(name))

  const onChange = useCallback(
    (event: FormEvent<HTMLInputElement> | string) => {
      // @ts-expect-error
      if (event?.target?.value) {
        // @ts-expect-error
        setValue(event.target.value as string)
        // @ts-expect-error
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
