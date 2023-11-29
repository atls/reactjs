import { Condition }          from '@atls-ui-parts/condition'

import React                  from 'react'
import { FC }                 from 'react'

import { ButtonType }         from '../../enums'
import { ButtonWrapperProps } from '../../interfaces'
import { useForm }            from '../form'

export const ButtonWrapper: FC<ButtonWrapperProps> = ({ children }) => {
  const { disabled, isLoaded } = useForm()

  return (
    <Condition match={typeof children === 'function'}>
      {children({
        type: ButtonType.Submit,
        disabled: disabled || !isLoaded,
      })}
    </Condition>
  )
}
