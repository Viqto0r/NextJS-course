import { FC } from 'react'
import cn from 'classnames'
import { ITextareaProps } from './Textarea.props'
import styles from './Textarea.module.css'

export const Textarea: FC<ITextareaProps> = ({ className, ...restProps }) => {
  return <textarea className={cn(styles.textarea, className)} {...restProps} />
}
