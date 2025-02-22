import { forwardRef } from 'react'
import cn from 'classnames'
import { ITextareaProps } from './Textarea.props'
import styles from './Textarea.module.css'

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ className, error, ...restProps }, ref) => {
    return (
      <div className={cn(styles.textareaWrapper, className)}>
        <textarea
          className={cn(styles.textarea, { [styles.error]: error })}
          {...restProps}
          ref={ref}
        />
        {error?.message && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    )
  }
)
