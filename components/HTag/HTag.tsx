import { FC } from 'react'
import { IHTagProps } from './HTag.props'
import styles from './HTag.module.css'

export const HTag: FC<IHTagProps> = ({ tag: Tag, children }) => {
  return <Tag className={styles[Tag]}>{children}</Tag>
}
