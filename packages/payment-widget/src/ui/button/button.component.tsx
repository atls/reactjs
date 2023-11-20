import styled                from '@emotion/styled'

import React                 from 'react'
import { FC }                from 'react'
import { useHover }          from 'react-laag'

import { CustomButtonProps } from '../../interfaces/custom-elements.interfaces'
import { appearanceStyles }  from './button.styles'
import { contentStyles }     from './button.styles'
import { baseStyles }        from './button.styles'
import { shapeStyles }       from './button.styles'

const ButtonElement = styled('button')<any>(
  baseStyles,
  contentStyles,
  appearanceStyles,
  shapeStyles
)

export const Button: FC<CustomButtonProps> = ({ children, ...props }) => {
  const [hover, hoverProps] = useHover()
  return (
    <ButtonElement hover={hover} {...hoverProps} {...props}>
      {children}
    </ButtonElement>
  )
}
