import { FC } from 'react'
import { IHeaderProps } from './Header.props'
import styles from './Header.module.css'

export const Header: FC<IHeaderProps> = ({ ...props }) => {
  return <header {...props}>Header</header>
}
