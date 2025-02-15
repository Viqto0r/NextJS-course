import { FC } from 'react'
import { IHHDataProps } from './HHData.props'
import styles from './HHData.module.css'
import { Card } from '../Card/Card'
import RateIcon from './rate.svg'
import { getPriceRu } from '../../helpers/helpers'

const getRate = (fillCount: number) => (
  <div className={styles.rate}>
    {Array.from({ length: 3 }).map((_, idx) => (
      <RateIcon className={idx < fillCount ? styles.filled : ''} key={idx} />
    ))}
  </div>
)

export const HHData: FC<IHHDataProps> = ({
  count,
  juniorSalary,
  middleSalary,
  seniorSalary,
}) => {
  return (
    <div className={styles.hh}>
      <Card className={styles.count}>
        <div className={styles.title}>Всего вакансий</div>
        <div className={styles.countValue}>{count}</div>
      </Card>
      <Card className={styles.salary}>
        <div>
          <div className={styles.title}>Начальный</div>
          <div className={styles.salaryValue}>{getPriceRu(juniorSalary)}</div>
          {getRate(1)}
        </div>
        <div>
          <div className={styles.title}>Средний</div>
          <div className={styles.salaryValue}>{getPriceRu(middleSalary)}</div>
          {getRate(2)}
        </div>
        <div>
          <div className={styles.title}>Профессионал</div>
          <div className={styles.salaryValue}>{getPriceRu(seniorSalary)}</div>
          {getRate(3)}
        </div>
      </Card>
    </div>
  )
}
