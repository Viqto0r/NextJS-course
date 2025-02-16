import { forwardRef } from 'react'
import cn from 'classnames'
import { ICardProps } from './Card.props'
import styles from './Card.module.css'

export const Card = forwardRef<HTMLDivElement, ICardProps>((props, ref) => {
  const { children, className, color = 'white', ...restProps } = props
  return (
    <div
      className={cn(styles.card, className, styles[color])}
      ref={ref}
      {...restProps}
    >
      {children}
    </div>
  )
})
