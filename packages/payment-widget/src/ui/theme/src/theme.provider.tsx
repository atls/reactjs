import * as theme                                from './theme'

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'

import React                                     from 'react'
import { FC }                                    from 'react'

import { ThemeProps }                            from '../../../interfaces'

export const ThemeProvider: FC<ThemeProps> = ({ useCustomTheme, children }) =>
  useCustomTheme ? (
    <>{children}</> // eslint-disable-line
  ) : (
    <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
  )
