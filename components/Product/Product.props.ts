import { HTMLAttributes } from 'react'
import { IProductModel } from '../../interfaces/product.interface'

export interface IProductProps extends HTMLAttributes<HTMLDivElement> {
  product: IProductModel
}
