import type { FC }                 from 'react'

import type { ButtonWrapperProps } from '../../interfaces'

import { Condition }               from '@atls-ui-parts/condition'
import React                       from 'react'

import { ButtonType }              from '../../enums'
import { NameWrapperComponent }    from '../../enums'
import { useForm }                 from '../form'

const ButtonWrapper: FC<ButtonWrapperProps> = ({ children }) => {
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

ButtonWrapper.displayName = NameWrapperComponent.ButtonWrapper

export { ButtonWrapper }
