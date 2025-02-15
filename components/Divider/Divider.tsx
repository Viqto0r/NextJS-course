import { FC } from 'react'
import cn from 'classnames'
import { IDividerProps } from './Divider.props'
import styles from './Divider.module.css'

export const Divider: FC<IDividerProps> = ({ className, ...restProps }) => {
  return <hr className={cn(styles.divider, className)} {...restProps} />
}
