import type { ButtonProps } from '@atls-ui-parts/button'
import type { FC }          from 'react'

import styled               from '@emotion/styled'
import { useHover }         from 'react-laag'
import React                from 'react'

import { appearanceStyles } from './button.styles'
import { contentStyles }    from './button.styles'
import { baseStyles }       from './button.styles'
import { shapeStyles }      from './button.styles'

const ButtonElement = styled('button')<ButtonProps>(
  // @ts-expect-error
  baseStyles,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  contentStyles,
  appearanceStyles,
  shapeStyles
)

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  const [hover, hoverProps] = useHover()
  return (
    // @ts-expect-error
    <ButtonElement hover={hover} {...hoverProps} {...props}>
      {children}
    </ButtonElement>
  )
}
