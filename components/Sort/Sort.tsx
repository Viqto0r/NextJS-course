import { FC } from 'react'
import cn from 'classnames'
import { ESortType, ISortProps } from './Sort.props'
import styles from './Sort.module.css'
import SortIcon from './sort.svg'

export const Sort: FC<ISortProps> = (props) => {
  const { sort, setSort, className, ...otherProps } = props

  return (
    <div className={cn(styles.sort, className)} {...otherProps}>
      <span
        className={cn({ [styles.active]: sort === ESortType.Rating })}
        onClick={() => setSort(ESortType.Rating)}
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </span>
      <span
        className={cn({ [styles.active]: sort === ESortType.Price })}
        onClick={() => setSort(ESortType.Price)}
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </span>
    </div>
  )
}
