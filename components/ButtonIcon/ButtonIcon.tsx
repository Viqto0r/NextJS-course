import { FC } from 'react'
import { IButtonIconProps, icons } from './ButtonIcon.props'
import styles from './ButtonIcon.module.css'
import cn from 'classnames'

export const ButtonIcon: FC<IButtonIconProps> = (props) => {
  const { appearance, className, icon, ...restProps } = props

  const IconComponent = icons[icon]

  return (
    <button
      className={cn(styles.button, className, styles[appearance])}
      {...restProps}
    >
      <IconComponent />
    </button>
  )
}
