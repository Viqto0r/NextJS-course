import { FC } from 'react'
import { IButtonProps } from './Button.props'
import styles from './Button.module.css'
import cn from 'classnames'
import ArrowIcon from './Arrow.svg'
import { motion } from 'framer-motion'

export const Button: FC<IButtonProps> = (props) => {
  const {
    appearance,
    children,
    className,
    arrow = 'none',
    ...restProps
  } = props

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={cn(styles.button, className, styles[appearance])}
      {...restProps}
    >
      {children}
      {arrow !== 'none' && (
        <span className={cn(styles.arrow, styles[arrow])}>
          <ArrowIcon />
        </span>
      )}
    </motion.button>
  )
}
