import type { FC }                               from 'react'

import type { ThemeProps }                       from '../../../interfaces/index.js'

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import React                                     from 'react'

import * as theme                                from './theme/index.js'

export const ThemeProvider: FC<ThemeProps> = ({ children }) => (
  <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
)
