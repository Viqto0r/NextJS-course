import { FC } from 'react'
import cn from 'classnames'
import { IInputProps } from './Input.props'
import styles from './Input.module.css'

export const Input: FC<IInputProps> = ({ className, ...restProps }) => {
  return <input className={cn(styles.input, className)} {...restProps} />
}
