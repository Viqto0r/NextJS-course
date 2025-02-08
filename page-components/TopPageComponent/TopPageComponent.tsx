import { FC } from 'react'
import cn from 'classnames'
import styles from './TopPageComponent.module.css'
import { ITopPageComponentProps } from './TopPageComponent.props'
import { H, Tag } from '../../components'
import { HHData } from '../../components/HHData/HHData'
import { ETopLevelCategory } from '../../interfaces/page.interface'

export const TopPageComponent: FC<ITopPageComponentProps> = ({
  firstCategory,
  page,
  products,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <H tag="h1">{page.title}</H>
        {products && <Tag color="gray">{products.length}</Tag>}
        <span>Сортировка</span>
      </div>
      <div>
        {products?.map((product) => (
          <div key={product._id}>{product.title}</div>
        ))}
      </div>
      <div className={styles.hhTitle}>
        <H tag="h2">Вакансии {page.category}</H>
        <Tag color="red">hh.ru</Tag>
      </div>
      {firstCategory === ETopLevelCategory.Courses && page.hh && (
        <HHData {...page.hh} />
      )}
    </div>
  )
}
