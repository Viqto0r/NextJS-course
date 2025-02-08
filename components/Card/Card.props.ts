import { HTMLAttributes, ReactNode } from 'react'

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  color?: 'white' | 'blue'
  children: ReactNode
}
