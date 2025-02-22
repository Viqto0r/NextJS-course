import { FC } from 'react'
import cn from 'classnames'
import { ESortType, ISortProps } from './Sort.props'
import styles from './Sort.module.css'
import SortIcon from './sort.svg'

export const Sort: FC<ISortProps> = (props) => {
  const { sort, setSort, className, ...otherProps } = props

  return (
    <div className={cn(styles.sort, className)} {...otherProps}>
      <div className={styles.sortName} id="sort">
        Сортировка
      </div>
      <button
        id="rating"
        className={cn({ [styles.active]: sort === ESortType.Rating })}
        onClick={() => setSort(ESortType.Rating)}
        aria-selected={sort === ESortType.Rating}
        aria-labelledby="sort rating"
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </button>
      <button
        id="price"
        className={cn({ [styles.active]: sort === ESortType.Price })}
        onClick={() => setSort(ESortType.Price)}
        aria-selected={sort === ESortType.Price}
        aria-labelledby="sort price"
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </button>
    </div>
  )
}
