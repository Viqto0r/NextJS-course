import { FC } from 'react'
import cn from 'classnames'
import { IPTagProps } from './PTag.props'
import styles from './PTag.module.css'

export const PTag: FC<IPTagProps> = ({
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
