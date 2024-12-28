import type { ReactElement } from 'react'
import type { FC }           from 'react'
import type { ReactNode }    from 'react'

import { isValidElement }    from 'react'
import { cloneElement }      from 'react'

import { useFlow }           from '../providers'

export interface FlowSubmitProps {
  method: string
  children: (submit: (method: string) => void) => ReactElement | ReactNode | null
}

export const FlowSubmit: FC<FlowSubmitProps> = ({ method, children }) => {
  const flow = useFlow()

  if (typeof children === 'function') {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return children(async (mtd: string) => flow.submit(mtd))
  }

  if (isValidElement(children)) {
    return cloneElement(children as ReactElement, {
      onClick: () => {
        flow.submit(method)
      },
    })
  }

  return null
}
