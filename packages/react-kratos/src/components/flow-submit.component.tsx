import type { ReactElement } from 'react'

import type { Body }         from '../providers'

import { useSubmit }         from '../hooks'

export interface FlowSubmitProps<T> {
  children: (submit: {
    onSubmit: (
      override?: Partial<T>,
      onSubmitConfirm?: () => void,
      onSubmitError?: (error: unknown) => void
    ) => void
    submitting: boolean
  }) => ReactElement
}

export const FlowSubmit = <T extends Body>({
  children,
}: FlowSubmitProps<T>): ReactElement | null => {
  const { submitting, onSubmit } = useSubmit<T>()

  if (typeof children === 'function') {
    return children({
      submitting,
      onSubmit: (
        override?: Partial<T>,
        onSubmitConfirm?: () => void,
        onSubmitError?: (error: unknown) => void
      ) => {
        onSubmit(override, onSubmitConfirm, onSubmitError)
      },
    })
  }

  return null
}
