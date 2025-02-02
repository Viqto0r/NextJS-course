import { FC, KeyboardEvent, useEffect, useState } from 'react'
import cn from 'classnames'
import { IRatingProps } from './Rating.props'
import StarIcon from './Star.svg'
import styles from './Rating.module.css'

export const Rating: FC<IRatingProps> = ({
  rating,
  setRating,
  isEditable = false,
  ...restProps
}) => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
    new Array(5).fill(<></>)
  )

  useEffect(() => {
    constructRating(rating)
  }, [rating])

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, idx: number) => (
      <span
        className={cn(styles.star, {
          [styles.filled]: idx < currentRating,
          [styles.editable]: isEditable,
        })}
        onMouseEnter={() => changeDisplay(idx + 1)}
        onMouseLeave={() => changeDisplay(rating)}
        onClick={() => onClick(idx + 1)}
      >
        <StarIcon
          tabIndex={isEditable ? 0 : -1}
          onKeyDown={(e: KeyboardEvent<SVGAElement>) =>
            isEditable && handleSpace(idx + 1, e)
          }
        />
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

  const handleSpace = (idx: number, e: KeyboardEvent<SVGAElement>) => {
    if (e.code !== 'Space') {
      return
    }

    setRating?.(idx)
  }

  return (
    <div {...restProps}>
      {ratingArray.map((rating, idx) => (
        <span key={idx}>{rating}</span>
      ))}
    </div>
  )
}
