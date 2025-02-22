import { HTMLAttributes, ReactNode } from 'react'

export interface ITagProps extends HTMLAttributes<HTMLDivElement> {
  size?: 's' | 'm'
  children: ReactNode
  className?: string
  color?: 'ghost' | 'red' | 'gray' | 'green' | 'primary'
  href?: HTMLAnchorElement['href']
}
