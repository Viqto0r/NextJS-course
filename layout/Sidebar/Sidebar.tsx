import { FC } from 'react'
import { ISidebarProps } from './Sidebar.props'
import styles from './Sidebar.module.css'
import { Menu } from '../Menu/Menu'
import Logo from '../logo.svg'
import cn from 'classnames'

export const Sidebar: FC<ISidebarProps> = ({ className, ...otherProps }) => {
  return (
    <aside className={cn(className, styles.sidebar)} {...otherProps}>
      <Logo className={styles.logo} />
      <div>Поиск</div>
      <Menu />
    </aside>
  )
}
