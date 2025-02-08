import { FC } from 'react'
import cn from 'classnames'
import { ICardProps } from './Card.props'
import styles from './Card.module.css'

export const Card: FC<ICardProps> = ({
  children,
  className,
  color = 'white',
  ...restProps
}) => {
  return (
    <div className={cn(styles.card, className, styles[color])} {...restProps}>
      {children}
    </div>
  )
}
