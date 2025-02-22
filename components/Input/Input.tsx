import { forwardRef } from 'react'
import cn from 'classnames'
import { IInputProps } from './Input.props'
import styles from './Input.module.css'

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ className, error, ...restProps }, ref) => {
    return (
      <div className={cn(styles.inputWrapper, className)}>
        <input
          className={cn(styles.input, { [styles.error]: error })}
          {...restProps}
          ref={ref}
        />
        {error && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    )
  }
)
