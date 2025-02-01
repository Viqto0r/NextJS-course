import { FC } from 'react'
import cn from 'classnames'
import { IPProps } from './P.props'
import styles from './P.module.css'

export const P: FC<IPProps> = ({
  size = 'm',
  children,
  className,
  ...restProps
}) => {
  return (
    <p className={cn(styles.p, className, styles[size])} {...restProps}>
      {children}
    </p>
  )
}
