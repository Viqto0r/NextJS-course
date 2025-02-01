import { FC } from 'react'
import { IHProps } from './H.props'
import styles from './H.module.css'

export const H: FC<IHProps> = ({ tag: Tag, children }) => {
  return <Tag className={styles[Tag]}>{children}</Tag>
}
