import { HTMLAttributes, ReactNode } from 'react'

export interface IPProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
  size?: 's' | 'm' | 'l'
}
