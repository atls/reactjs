import { createAppearanceStyles } from '@atls-ui-parts/button'
import { createContentStyles }    from '@atls-ui-parts/button'
import { createBaseStyles }       from '@atls-ui-parts/button'
import { createShapeStyles }      from '@atls-ui-parts/button'
import { ifProp }                 from 'styled-tools'
import { prop }                   from 'styled-tools'

import { theme }                  from '../theme/src/index.js'

const buttonDefaultStyles = createAppearanceStyles({
  fontColor: theme.colors.button.default.font,
  backgroundColor: theme.colors.button.default.backgroundColor,
  borderColor: theme.colors.button.default.border,
})

const buttonHoverStyles = createAppearanceStyles({
  fontColor: theme.colors.button.hover.font,
  backgroundColor: theme.colors.button.hover.backgroundColor,
  borderColor: theme.colors.button.hover.border,
})

const buttonDisabledStyles = createAppearanceStyles({
  fontColor: theme.colors.button.disabled.font,
  backgroundColor: theme.colors.button.disabled.backgroundColor,
  borderColor: theme.colors.button.disabled.border,
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createTransitionStyles = () => () => ({
  transition: '.25s',
})

const getBaseStyles = (): (() => Record<string, unknown>) => {
  const baseStyles = createBaseStyles()
  const transitionStyles = createTransitionStyles()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return () => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    ...baseStyles(),
    ...transitionStyles(),
  })
}

const baseStyles = getBaseStyles()
const contentStyles = createContentStyles()

const appearanceStyles = ifProp(
  prop('disabled', false),
  buttonDisabledStyles,
  ifProp(prop('hover', false), buttonHoverStyles, buttonDefaultStyles)
)

const shapeStyles = createShapeStyles({
  size: 36,
  rounding: 5,
  paddingRight: 36,
  paddingLeft: 36,
})

export { baseStyles, appearanceStyles, shapeStyles, contentStyles }
