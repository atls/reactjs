import styled                           from '@emotion/styled'
import { Condition }                    from '@atls-ui-parts/condition'
import { RawInput }                     from '@atls-ui-parts/input'
import { InputProps as BaseInputProps } from '@atls-ui-parts/input'
import { Layout }                       from '@atls-ui-parts/layout'
import { Text }                         from '@atls-ui-parts/text'
import { useChangeValue }               from '@atls-ui-parts/input'

import React                            from 'react'
import { ForwardRefRenderFunction }     from 'react'
import { useState }                     from 'react'
import { useRef }                       from 'react'
import { forwardRef }                   from 'react'
import { useHover }                     from 'react-laag'
import { layout }                       from 'styled-system'

import { appearanceStyles }             from './payment-input.styles'
import { baseStyles }                   from './payment-input.styles'
import { shapeStyles }                  from './payment-input.styles'
import { transitionStyles }             from './payment-input.styles'

export const InputElement = styled.div<any>(
  baseStyles,
  shapeStyles,
  appearanceStyles,
  transitionStyles,
  layout
)

const Container = styled.div(({ type }: any) => ({
  display: type === 'hidden' ? 'none' : 'flex',
  width: '100%',
  flexDirection: 'column',
}))

interface InputProps extends BaseInputProps {
  errorText?: string
}

export const InputWithoutRef: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { value, type, disabled, errorText = '', onChange, onChangeNative, placeholder, ...props },
  ref
) => {
  const changeValue = useChangeValue(disabled, onChange, onChangeNative)
  const [, hoverProps] = useHover()
  const [, setFocus] = useState<boolean>(false)

  if (!ref) {
    ref = useRef(null) // eslint-disable-line
  }

  return (
    <Container
      type={type}
      onBlur={() => {
        ;(ref as any).current.blur()
        setFocus(false)
      }}
      onFocus={() => {
        ;(ref as any).current.focus()
        setFocus(true)
      }}
      {...hoverProps}
    >
      <InputElement {...props} error={errorText !== ''}>
        <RawInput
          ref={ref}
          type={type}
          disabled={disabled}
          value={value}
          onChange={changeValue}
          placeholder={placeholder}
          {...props}
        />
      </InputElement>
      <Condition match={!!errorText}>
        <Layout flexBasis={8} flexShrink={0} />
        <Text>{errorText}</Text>
      </Condition>
    </Container>
  )
}

export const PaymentInput = forwardRef<HTMLInputElement, InputProps>(InputWithoutRef)
