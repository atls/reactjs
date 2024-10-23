import type { PropsWithChildren } from 'react'
import type { HTMLAttributes }    from 'react'
import type { FC }                from 'react'

import { useMemo }                from 'react'
import React                      from 'react'

import { useFlow }                from '../providers'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FlowFormProps extends HTMLAttributes<HTMLFormElement> {}

export const FlowForm: FC<PropsWithChildren<FlowFormProps>> = ({ children, ...props }) => {
  const flow = useFlow()

  // eslint-disable-next-line
  const ui = useMemo(() => flow.getState()?.ui, [flow.getState()])

  if (!ui) {
    return null
  }

  return (
    <form {...props} action={ui.action} method={ui.method}>
      {children}
    </form>
  )
}
