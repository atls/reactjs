import { createBaseStyles }       from '@atls-ui-parts/input'
import { createShapeStyles }      from '@atls-ui-parts/input'
import { createAppearanceStyles } from '@atls-ui-parts/input'

import { ifProp }                 from 'styled-tools'

import { theme }                  from '../payment-theme/src/index'

export const shapeStyles = createShapeStyles({
  fontWeight: 400,
  size: 56,
  fontSize: 16,
  rounding: 4,
  paddingLeft: 16,
  paddingRight: 16,
})

export const baseStyles = createBaseStyles()

export const inputColorsStyles = () => ({
  ...createAppearanceStyles({
    fontColor: theme.colors.input.default.font,
    backgroundColor: theme.colors.input.default.backgroundColor,
    borderColor: theme.colors.input.default.border,
  })(),
  '&:hover': {
    ...createAppearanceStyles({
      fontColor: theme.colors.input.hover.font,
      backgroundColor: theme.colors.input.hover.backgroundColor,
      borderColor: theme.colors.input.hover.border,
    })(),
  },
  '&:focus-within': {
    ...createAppearanceStyles({
      fontColor: theme.colors.input.focus.font,
      backgroundColor: theme.colors.input.focus.backgroundColor,
      borderColor: theme.colors.input.focus.border,
    })(),
  },
  '&:active': {
    ...createAppearanceStyles({
      fontColor: theme.colors.input.focus.font,
      backgroundColor: theme.colors.input.focus.backgroundColor,
      borderColor: theme.colors.input.focus.border,
    })(),
  },
})

export const inputErrorColorsStyles = createAppearanceStyles({
  fontColor: theme.colors.input.error.font,
  backgroundColor: theme.colors.input.error.backgroundColor,
  borderColor: theme.colors.input.error.border,
})

export const appearanceStyles = ifProp('error', inputErrorColorsStyles, inputColorsStyles)

export const transitionStyles = { transition: '.25s' }
