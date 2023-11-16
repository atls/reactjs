import styled               from '@emotion/styled'

import React                from 'react'
import { FC }               from 'react'
import { useHover }         from 'react-laag'

import { ButtonStyles }     from '../../interfaces'
import { appearanceStyles } from './button.styles'
import { contentStyles }    from './button.styles'
import { baseStyles }       from './button.styles'
import { shapeStyles }      from './button.styles'

const ButtonElement = ({ styledArray, ...props }) => {
  const StyledButton = styledArray.length
    ? styled('button')<any>(...styledArray)
    : styled('button')<any>(baseStyles, contentStyles, appearanceStyles, shapeStyles)
  return <StyledButton {...props} />
}

export const Button: FC<ButtonStyles> = ({ children, styledArray, ...props }) => {
  const [hover, hoverProps] = useHover()
  return (
    <ButtonElement hover={hover} {...hoverProps} styledArray={styledArray} {...props}>
      {children}
    </ButtonElement>
  )
}
