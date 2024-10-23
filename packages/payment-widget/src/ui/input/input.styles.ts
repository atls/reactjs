import type { styleFn }           from 'styled-system'

import { createBaseStyles }       from '@atls-ui-parts/input'
import { createShapeStyles }      from '@atls-ui-parts/input'
import { createAppearanceStyles } from '@atls-ui-parts/input'

export const baseStyles = createBaseStyles()
export const transitionStyles = { transition: '.25s' }

export const shapeStyles = createShapeStyles({
  fontWeight: 400,
  size: 56,
  fontSize: 16,
  rounding: 4,
  paddingLeft: 16,
  paddingRight: 16,
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const appearanceStyles: styleFn = ({ theme, error }) => ({
  ...createAppearanceStyles({
    fontColor: theme.colors.input.default.font,
    backgroundColor: theme.colors.input.default.backgroundColor,
    borderColor: theme.colors.input.default.border,
  })(),
  '&:hover': {
    ...createAppearanceStyles({
      fontColor: theme.colors.input.hover.font,
      backgroundColor: error
        ? theme.colors.input.error.hover.backgroundColor
        : theme.colors.input.hover.backgroundColor,
      borderColor: theme.colors.input.hover.border,
    })(),
  },
  '&:focus-within, &:active, &:focus': {
    ...createAppearanceStyles({
      fontColor: theme.colors.input.focus.font,
      backgroundColor: theme.colors.input.focus.backgroundColor,
      borderColor: error
        ? theme.colors.input.error.focus.borderColor
        : theme.colors.input.focus.border,
    })(),
  },
  ...(error && {
    ...createAppearanceStyles({
      fontColor: theme.colors.input.error.default.font,
      backgroundColor: theme.colors.input.error.default.backgroundColor,
      borderColor: theme.colors.input.error.default.border,
    })(),
  }),
  'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active':
    {
      WebkitTransition: 'color 9999s ease-out, background-color 9999s ease-out',
      WebkitTransitionDelay: '9999s',
    },
})
