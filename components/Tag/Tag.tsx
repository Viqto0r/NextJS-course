import { FC } from 'react'
import cn from 'classnames'
import { ITagProps } from './Tag.props'
import styles from './Tag.module.css'

export const Tag: FC<ITagProps> = (props) => {
  const {
    color = 'primary',
    children,
    size = 'm',
    className,
    href,
    ...restProps
  } = props

  const style = cn(styles.tag, styles[color], styles[size], className)

  return href ? (
    <a className={style} href={href}>
      {children}
    </a>
  ) : (
    <div className={style} {...restProps}>
      {children}
    </div>
  )
}
