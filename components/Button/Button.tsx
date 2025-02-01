import { FC } from 'react'
import { IButtonProps } from './Button.props'
import styles from './Button.module.css'
import cn from 'classnames'

export const Button: FC<IButtonProps> = (props) => {
  const { appearance, children, className, ...restProps } = props

  return (
    <button
      className={cn(styles.button, className, styles[appearance])}
      {...restProps}
    >
      {children}
    </button>
  )
}
