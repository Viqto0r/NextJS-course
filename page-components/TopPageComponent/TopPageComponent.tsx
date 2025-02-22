import { FC, useEffect, useReducer } from 'react'
import styles from './TopPageComponent.module.css'
import { ITopPageComponentProps } from './TopPageComponent.props'
import { Advantages, H, Product, Sort, Tag } from '../../components'
import { HHData } from '../../components/HHData/HHData'
import { ETopLevelCategory } from '../../interfaces/page.interface'
import { ESortType } from '../../components/Sort/Sort.props'
import { sortReducer } from './sort.reducer'
import { useReducedMotion } from 'framer-motion'

export const TopPageComponent: FC<ITopPageComponentProps> = ({
  firstCategory,
  page,
  products,
}) => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    sortReducer,
    {
      sort: ESortType.Rating,
      products,
    }
  )
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    dispatchSort({ type: 'reset', initialState: products })
  }, [products])

  const setSort = (sortType: ESortType) => dispatchSort({ type: sortType })

  return (
    <div>
      <div className={styles.title}>
        <H tag="h1">{page.title}</H>
        {sortedProducts && (
          <Tag color="gray" aria-label={sortedProducts.length + 'элементов'}>
            {sortedProducts.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div role="list">
        {sortedProducts?.map((product) => (
          <Product
            layout={!shouldReduceMotion}
            key={product._id}
            product={product}
            role="listitem"
          />
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
