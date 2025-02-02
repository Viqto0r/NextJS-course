import { FC } from 'react'
import { ISidebarProps } from './Sidebar.props'
import styles from './Sidebar.module.css'

export const Sidebar: FC<ISidebarProps> = ({ ...props }) => {
  return <aside {...props}>Sidebar</aside>
}
