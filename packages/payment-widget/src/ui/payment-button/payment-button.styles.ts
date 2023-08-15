import { createAppearanceStyles } from '@atls-ui-parts/button'
import { createBaseStyles }       from '@atls-ui-parts/button'
import { createShapeStyles }      from '@atls-ui-parts/button'

import { prop }                   from 'styled-tools'
import { switchProp }             from 'styled-tools'

import { theme }                  from '../payment-theme/src/index'

const appearanceLightStyles = createAppearanceStyles({
  fontColor: theme.colors.button.light.font,
  backgroundColor: theme.colors.button.light.backgroundColor,
  borderColor: theme.colors.button.light.border,
})

const appearanceDarkStyles = createAppearanceStyles({
  fontColor: theme.colors.button.dark.font,
  backgroundColor: theme.colors.button.dark.backgroundColor,
  borderColor: theme.colors.button.dark.border,
})

const baseStyles = createBaseStyles()

const appearanceStyles = switchProp(prop('theme'), {
  light: appearanceLightStyles,
  dark: appearanceDarkStyles,
})

const shapeStyles = createShapeStyles({
  size: 36,
  rounding: 5,
  paddingRight: 24,
  paddingLeft: 24,
})

export { baseStyles, appearanceStyles, shapeStyles }
