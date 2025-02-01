import { HTMLAttributes, ReactNode } from 'react'

export interface IHTagProps extends HTMLAttributes<HTMLHeadingElement> {
  tag: 'h1' | 'h2' | 'h3'
  children: ReactNode
}
