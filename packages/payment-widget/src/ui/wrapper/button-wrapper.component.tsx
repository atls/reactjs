import { Condition }            from '@atls-ui-parts/condition'
import { FC }                   from 'react'
import React                    from 'react'

import { ButtonType }           from '../../enums'
import { NameWrapperComponent } from '../../enums'
import { ButtonWrapperProps }   from '../../interfaces'
import { useForm }              from '../form'

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
