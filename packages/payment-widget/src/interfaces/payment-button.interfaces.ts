/* eslint-disable no-shadow */
import { ButtonProps as BaseButtonProps } from '@atls-ui-parts/button'

export enum ThemeButton {
  Light = 'light',
  Dark = 'dark',
}

export interface ButtonProps extends BaseButtonProps {
  theme?: ThemeButton
}
