import { UiNode }       from '@ory/kratos-client'
import { ReactElement } from 'react'
import { FC }           from 'react'
import { useMemo }      from 'react'
import { useState }     from 'react'
import { useCallback }  from 'react'
import { FormEvent }    from 'react'

import { useFlow }      from '../providers'

interface FlowUiNodeAttributes {
  disabled: boolean
  name: string
  pattern?: string
  required?: boolean
  type: string
  value?: any | null
  src: string
}

interface FlowUiNode extends Omit<UiNode, 'attributes'> {
  attributes: FlowUiNodeAttributes
}

type OnChangeCallback = (event: FormEvent<HTMLInputElement> | string | any) => void

export interface FlowNodeProps {
  name: string
  children: (node: FlowUiNode, value: string | any, callback: OnChangeCallback) => ReactElement<any>
}

export const FlowNode: FC<FlowNodeProps> = ({ name, children }) => {
  const flow = useFlow()

  // eslint-disable-next-line
  const node = useMemo(() => flow.getNode(name), [name, flow, flow.getState()])

  const [value = '', setValue] = useState(flow.getValue(name))

  const onChange = useCallback(
    (event: FormEvent<HTMLInputElement> | string | any) => {
      if (event && event.target) {
        setValue(event.target.value)
        flow.setValue(name, event.target.value)
      } else {
        setValue(event)
        flow.setValue(name, event)
      }
    },
    [name, flow, setValue]
  )

  if (node && typeof children === 'function') {
    return children(node as FlowUiNode, value, onChange)
  }

  return null
}
