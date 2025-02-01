import { ReactNode } from 'react'

export interface ITagProps {
  size?: 's' | 'm'
  children: ReactNode
  className?: string
  color?: 'ghost' | 'red' | 'gray' | 'green' | 'primary'
  href?: HTMLAnchorElement['href']
}
