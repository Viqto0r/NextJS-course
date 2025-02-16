import { HTMLAttributes } from 'react'
import up from './up.svg'
import close from './close.svg'
import menu from './menu.svg'

export const icons = { up, close, menu }
export type TIconName = keyof typeof icons

export interface IButtonIconProps extends HTMLAttributes<HTMLButtonElement> {
  icon: TIconName
  appearance: 'primary' | 'white'
}
