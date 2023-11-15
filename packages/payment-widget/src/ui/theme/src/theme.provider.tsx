import * as theme                                from './theme'

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'

import React                                     from 'react'

export const ThemeProvider = ({ customTheme, children }) => (
  <EmotionThemeProvider theme={customTheme ?? theme}>{children}</EmotionThemeProvider>
)
