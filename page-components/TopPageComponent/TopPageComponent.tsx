import { FC } from 'react'
import styles from './TopPageComponent.module.css'
import { ITopPageComponentProps } from './TopPageComponent.props'
import { Advantages, H, P, Tag } from '../../components'
import { HHData } from '../../components/HHData/HHData'
import { ETopLevelCategory } from '../../interfaces/page.interface'

export const TopPageComponent: FC<ITopPageComponentProps> = ({
  firstCategory,
  page,
  products,
}) => {
  return (
    <div>
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
      {!!page.advantages?.length && (
        <div className={styles.advantages}>
          <H tag="h2">Преимущества</H>
          <Advantages advantages={page.advantages} />
        </div>
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <H tag="h2">Получаемые навыки</H>
      <div className={styles.tags}>
        {page.tags.map((tag) => (
          <Tag key={tag} className={styles.tag}>
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  )
}
