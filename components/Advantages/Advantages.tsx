import { FC } from 'react'
import { IAdvantagesProps } from './Advantages.props'
import styles from './Advantages.module.css'
import CheckIcon from './check.svg'

export const Advantages: FC<IAdvantagesProps> = ({ advantages }) => {
  return (
    <>
      {advantages.map((advantage) => {
        return (
          <div key={advantage._id} className={styles.advantage}>
            <CheckIcon />
            <div className={styles.title}>{advantage.title}</div>
            <hr className={styles.vLine} />
            <div>{advantage.description}</div>
          </div>
        )
      })}
    </>
  )
}
