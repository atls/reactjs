import type { FC }                 from 'react'

import type { ButtonWrapperProps } from '../../interfaces/index.js'

import { Condition }               from '@atls-ui-parts/condition'
import React                       from 'react'

import { ButtonType }              from '../../enums/index.js'
import { NameWrapperComponent }    from '../../enums/index.js'
import { useForm }                 from '../form/index.js'

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
