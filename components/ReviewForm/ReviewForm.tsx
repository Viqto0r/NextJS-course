import { FC, useState } from 'react'
import cn from 'classnames'
import { IReviewFormProps } from './ReviewForm.props'
import styles from './ReviewForm.module.css'
import { Input } from '../Input/Input'
import { Rating } from '../Rating/Rating'
import { Textarea } from '../Textarea/Textarea'
import { Button } from '../Button/Button'
import CloseIcon from './close.svg'
import { useForm, Controller } from 'react-hook-form'
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface'
import axios from 'axios'
import { API } from '../../helpers/api'

export const ReviewForm: FC<IReviewFormProps> = ({
  className,
  productId,
  ...restProps
}) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IReviewForm>()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      )

      if (data.message) {
        setIsSuccess(true)
        reset()
      } else {
        throw new Error()
      }
    } catch (e) {
      setIsError(true)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...restProps}>
        <Input
          {...register('name', {
            required: { value: true, message: 'Заполните имя' },
          })}
          error={errors.name}
          placeholder="Имя"
        />
        <Input
          {...register('title', {
            required: { value: true, message: 'Заполните заголовок' },
          })}
          error={errors.title}
          placeholder="Заголовок отзыва"
          className={styles.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                setRating={field.onChange}
                error={errors.rating}
                ref={field.ref}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', {
            required: { value: true, message: 'Заполните описание' },
          })}
          placeholder="Текст отзыва"
          className={styles.description}
          error={errors.description}
        />
        <div className={styles.submit}>
          <Button appearance="primary">Отправить</Button>
          <span>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.panel, styles.success)}>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
          <CloseIcon
            className={styles.close}
            onClick={() => setIsSuccess(false)}
          />
        </div>
      )}
      {isError && (
        <div className={cn(styles.panel, styles.error)}>
          Что-то пошло не так, попробуйте обновить страницу onClick=
          <CloseIcon
            className={styles.close}
            onClick={() => setIsError(false)}
          />
        </div>
      )}
    </form>
  )
}
