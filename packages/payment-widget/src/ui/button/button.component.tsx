import type { ButtonProps } from '@atls-ui-parts/button'
import type { FC }          from 'react'
import type { styleFn }     from 'styled-system'

import styled               from '@emotion/styled'
import { useHover }         from 'react-laag'
import React                from 'react'

import { appearanceStyles } from './button.styles.js'
import { contentStyles }    from './button.styles.js'
import { baseStyles }       from './button.styles.js'
import { shapeStyles }      from './button.styles.js'

const ButtonElement = (styled.default ?? styled)('button')<ButtonProps & { hover: boolean }>(
  baseStyles as styleFn,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  contentStyles,
  appearanceStyles,
  shapeStyles
)

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  const [hover, hoverProps] = useHover()
  return (
    <ButtonElement hover={hover} {...hoverProps} {...props}>
      {children}
    </ButtonElement>
  )
}
