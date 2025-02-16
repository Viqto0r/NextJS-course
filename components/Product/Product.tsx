import { FC, forwardRef, useRef, useState } from 'react'
import Image from 'next/image'
import cn from 'classnames'
import { IProductProps } from './Product.props'
import styles from './Product.module.css'
import { Card } from '../Card/Card'
import { Rating } from '../Rating/Rating'
import { Tag } from '../Tag/Tag'
import { Button } from '../Button/Button'
import { getPluralForm, getPriceRu } from '../../helpers/helpers'
import { Divider } from '../Divider/Divider'
import { Review } from '../Review/Review'
import { ReviewForm } from '../ReviewForm/ReviewForm'
import { motion } from 'framer-motion'

const ProductComponent: FC<IProductProps> = forwardRef<
  HTMLDivElement,
  IProductProps
>((props, ref) => {
  const { className, product, ...restProps } = props

  const [isReviewOpened, setIsReviewOpened] = useState(false)
  const reviewRef = useRef<HTMLDivElement>(null)

  const scrollToReview = () => {
    setIsReviewOpened(true)
    reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const variants = {
    visible: { height: 'auto', opacity: 1 },
    hidden: { height: 0, opacity: 0 },
  }

  return (
    <div className={className} {...restProps} ref={ref}>
      <Card className={styles.product} color="white">
        <div className={styles.logo}>
          <Image
            src={product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          {getPriceRu(product.price)}
          {product.oldPrice && (
            <Tag color="green" className={styles.discount}>
              {getPriceRu(product.price - product.oldPrice)}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>
          {getPriceRu(product.credit)}
          <span className={styles.month}>/мес</span>
        </div>
        <div className={styles.rating}>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>
          {product.categories.map((category) => (
            <Tag key={category} color="ghost" size="s">
              {category}
            </Tag>
          ))}
        </div>
        <div className={styles.priceTitle}>цена</div>
        <div className={styles.creditTitle}>кредит</div>
        <div className={styles.rateTitle}>
          <a href="#ref" onClick={scrollToReview}>
            {product.reviewCount}{' '}
            {getPluralForm(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
          </a>
        </div>
        <Divider className={styles.divider} />
        <div className={styles.description}>{product.description}</div>
        <div className={styles.features}>
          {product.characteristics.map((characteristic) => (
            <div className={styles.characteristic} key={characteristic.name}>
              <span className={styles.characteristicName}>
                {characteristic.name}
              </span>
              <span className={styles.characteristicDots} />
              <span>{characteristic.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advantagesBlock}>
          {product.advantages && (
            <div className={styles.advantages}>
              <div className={styles.advantagesTitle}>Преимущества</div>
              <div>{product.advantages}</div>
            </div>
          )}
          {product.disadvantages && (
            <div className={styles.disadvantages}>
              <div className={styles.advantagesTitle}>Недостатки</div>
              <div>{product.disadvantages}</div>
            </div>
          )}
        </div>
        <Divider className={cn(styles.divider, styles.divider2)} />
        <div className={styles.actions}>
          <Button appearance="primary">Узнать подробнее</Button>
          <Button
            appearance="ghost"
            arrow={isReviewOpened ? 'down' : 'right'}
            onClick={() => setIsReviewOpened((prev) => !prev)}
          >
            {isReviewOpened ? 'Скрыть отзывы' : 'Читать отзывы'}
          </Button>
        </div>
      </Card>
      <motion.div
        className={styles.reviewsWrapper}
        variants={variants}
        initial={'hidden'}
        animate={isReviewOpened ? 'visible' : 'hidden'}
      >
        <Card color="blue" className={styles.reviews} ref={reviewRef}>
          {product.reviews.map((review) => (
            <div key={review._id}>
              <Review review={review} />
              <Divider />
            </div>
          ))}
          <ReviewForm productId={product._id} />
        </Card>
      </motion.div>
    </div>
  )
})

export const Product = motion(ProductComponent)
