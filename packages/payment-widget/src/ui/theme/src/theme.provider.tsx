import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { FC }                                    from 'react'
import React                                     from 'react'

import * as theme                                from './theme'
import { ThemeProps }                            from '../../../interfaces'

export const ThemeProvider: FC<ThemeProps> = ({ children }) => (
  <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
)
