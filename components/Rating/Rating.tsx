import { forwardRef, KeyboardEvent, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { IRatingProps } from './Rating.props'
import StarIcon from './Star.svg'
import styles from './Rating.module.css'

export const Rating = forwardRef<HTMLDivElement, IRatingProps>((props, ref) => {
  const {
    rating,
    setRating,
    isEditable = false,
    error,
    tabIndex,
    ...restProps
  } = props
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
    new Array(5).fill(<></>)
  )
  const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    constructRating(rating)
  }, [rating, tabIndex])

  const computeFocus = (rating: number, idx: number) => {
    if (!isEditable) {
      return -1
    }

    if (!rating && idx === 0) {
      return tabIndex ?? 0
    }

    if (rating === idx + 1) {
      return tabIndex ?? 0
    }

    return -1
  }

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((_: JSX.Element, idx: number) => (
      <span
        className={cn(styles.star, {
          [styles.filled]: idx < currentRating,
          [styles.editable]: isEditable,
        })}
        onMouseEnter={() => changeDisplay(idx + 1)}
        onMouseLeave={() => changeDisplay(rating)}
        onClick={() => onClick(idx + 1)}
        onKeyDown={handleKeyDown}
        ref={(ref) => ratingArrayRef.current?.push(ref)}
        tabIndex={computeFocus(rating, idx)}
        role={isEditable ? 'slider' : undefined}
        aria-valuenow={rating}
        aria-valuemin={1}
        aria-valuemax={5}
        aria-label={isEditable ? 'Укажите рейтинг' : 'рейтинг' + rating}
        aria-invalid={!!error}
      >
        <StarIcon />
      </span>
    ))

    setRatingArray(updatedArray)
  }

  const changeDisplay = (idx: number) => {
    if (!isEditable) {
      return
    }

    constructRating(idx)
  }

  const onClick = (idx: number) => {
    if (!isEditable) {
      return
    }

    setRating?.(idx)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (!isEditable || !setRating) {
      return
    }

    if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
      e.preventDefault()

      setRating((rating) => {
        if (!rating) {
          return 1
        }

        if (rating === 5) {
          return 5
        }

        return rating + 1
      })

      ratingArrayRef.current[rating]?.focus()
    }

    if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
      e.preventDefault()
      setRating((rating) => (rating > 0 ? rating - 1 : 0))

      ratingArrayRef.current[rating - 2]?.focus()
    }
  }

  return (
    <div
      {...restProps}
      ref={ref}
      className={cn(styles.ratingWrapper, { [styles.error]: error })}
    >
      {ratingArray.map((rating, idx) => (
        <span key={idx}>{rating}</span>
      ))}
      {error?.message && (
        <span className={styles.errorMessage}>{error.message}</span>
      )}
    </div>
  )
})
