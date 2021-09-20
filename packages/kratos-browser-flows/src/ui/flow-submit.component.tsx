import { ReactElement }   from 'react'
import { isValidElement } from 'react'
import { cloneElement }   from 'react'

import { useFlow }        from '../providers'

export const FlowSubmit = ({ method, children }) => {
  const flow = useFlow()

  if (typeof children === 'function') {
    return children((mtd) => flow.submit(mtd))
  }

  if (isValidElement(children)) {
    return cloneElement(children as ReactElement<any>, {
      onClick: () => {
        flow.submit(method)
      },
    })
  }

  return null
}
