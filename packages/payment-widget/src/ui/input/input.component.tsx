import type { InputProps as BaseInputProps } from '@atls-ui-parts/input'
import type { ForwardRefRenderFunction }     from 'react'

import { Condition }                         from '@atls-ui-parts/condition'
import { RawInput }                          from '@atls-ui-parts/input'
import { Layout }                            from '@atls-ui-parts/layout'
import { Text }                              from '@atls-ui-parts/text'
import { useChangeValue }                    from '@atls-ui-parts/input'
import styled                                from '@emotion/styled'
import { useState }                          from 'react'
import { useRef }                            from 'react'
import { forwardRef }                        from 'react'
import { useHover }                          from 'react-laag'
import { layout }                            from 'styled-system'
import React                                 from 'react'

import { theme }                             from '../theme/src/index.js'
import { appearanceStyles }                  from './input.styles.js'
import { baseStyles }                        from './input.styles.js'
import { shapeStyles }                       from './input.styles.js'
import { transitionStyles }                  from './input.styles.js'

export const InputElement = (styled.default ?? styled).div<any>(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  baseStyles,
  shapeStyles,
  appearanceStyles,
  transitionStyles,
  layout
)

const Container = (styled.default ?? styled).div(({ type }: any) => ({
  display: type === 'hidden' ? 'none' : 'flex',
  width: '100%',
  flexDirection: 'column',
}))

interface InputProps extends BaseInputProps {
  errorText?: string
}

export const InputWithoutRef: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    value,
    type,
    required,
    disabled,
    errorText = '',
    onChange,
    onChangeNative,
    placeholder,
    ...props
  },
  ref
) => {
  const changeValue = useChangeValue(disabled, onChange, onChangeNative)
  const [, hoverProps] = useHover()
  // eslint-disable-next-line react/hook-use-state
  const [, setFocus] = useState<boolean>(false)

  if (!ref) {
    ref = useRef(null) // eslint-disable-line
  }

  return (
    <Container
      type={type}
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      onClick={() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        ;(ref as any).current.focus()
      }}
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      onBlur={() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        ;(ref as any).current.blur()
        setFocus(false)
      }}
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      onFocus={() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        ;(ref as any).current.focus()
        setFocus(true)
      }}
      {...hoverProps}
    >
      <InputElement {...props} error={errorText !== ''}>
        <RawInput
          ref={ref}
          type={type}
          required={required}
          disabled={disabled}
          value={value}
          // eslint-disable-next-line react/jsx-sort-props
          onChange={changeValue}
          // eslint-disable-next-line react/jsx-no-leaked-render
          placeholder={required ? `${placeholder!}*` : placeholder}
          {...props}
        />
      </InputElement>
      <Condition match={!!errorText}>
        <Layout flexBasis={8} flexShrink={0} />
        <Text color={theme.colors.input.error.default.font}>{errorText}</Text>
      </Condition>
    </Container>
  )
}

export const Input = forwardRef<HTMLInputElement, InputProps>(InputWithoutRef)
export const MemoizedInput = React.memo(Input)
