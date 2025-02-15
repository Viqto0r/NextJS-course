import { HTMLAttributes } from 'react'
import { IReviewModel } from '../../interfaces/product.interface'

export interface IReviewProps extends HTMLAttributes<HTMLDivElement> {
  review: IReviewModel
}
