import { FC } from 'react'
import cn from 'classnames'
import { IReviewProps } from './Review.props'
import styles from './Review.module.css'
import UserIcon from './user.svg'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Rating } from '../Rating/Rating'

export const Review: FC<IReviewProps> = ({
  className,
  review,
  ...restProps
}) => {
  const { name, title, description, createdAt, rating } = review
  return (
    <div className={cn(styles.review, className)} {...restProps}>
      <UserIcon className={styles.user} />
      <div className={styles.title}>
        <span className={styles.name}>{name}:</span>
        <span>{title}</span>
      </div>
      <div className={styles.date}>
        {format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}
      </div>
      <div className={styles.rating}>
        <Rating rating={rating} />
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  )
}
