import { ButtonType }         from '../../enums'
import { ButtonWrapperProps } from '../../interfaces'
import { useForm }            from '../form'

export const ButtonWrapper = ({ children }: ButtonWrapperProps) => {
  const { disabled, isLoaded } = useForm()

  if (typeof children === 'function') {
    return children({
      type: ButtonType.Submit,
      disabled: disabled || !isLoaded,
    })
  }

  return null
}
