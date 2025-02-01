import { HTMLAttributes, ReactNode } from 'react'

export interface IPTagProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
  size?: 's' | 'm' | 'l'
}
