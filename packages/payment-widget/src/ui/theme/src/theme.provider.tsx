import type { FC }                               from 'react'

import type { ThemeProps }                       from '../../../interfaces'

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import React                                     from 'react'

import * as theme                                from './theme'

export const ThemeProvider: FC<ThemeProps> = ({ children }) => (
  <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
)
