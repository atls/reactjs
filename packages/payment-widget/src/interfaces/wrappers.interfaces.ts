import { FormEvent }    from 'react'
import { ReactElement } from 'react'

type OnCallback = (event: FormEvent<HTMLInputElement> | string | any) => void

export interface InputWrapperProps {
  name: string
  children: (
    value: string,
    onChange: OnCallback,
    onBlur: OnCallback,
    errorText: string
  ) => ReactElement<any>
}

export interface ButtonWrapperProps {
  children: () => ReactElement<any>
}
