import { FC } from 'react'
import { ISidebarProps } from './Sidebar.props'
import styles from './Sidebar.module.css'
import { Menu } from '../Menu/Menu'

export const Sidebar: FC<ISidebarProps> = ({ ...props }) => {
  return (
    <aside {...props}>
      <Menu />
    </aside>
  )
}
