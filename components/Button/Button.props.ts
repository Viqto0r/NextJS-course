import { HTMLAttributes, ReactNode } from 'react'

export interface IButtonProps
  extends Omit<
    HTMLAttributes<HTMLButtonElement>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
  > {
  children: ReactNode
  appearance: 'primary' | 'ghost'
  arrow?: 'right' | 'down' | 'none'
}
