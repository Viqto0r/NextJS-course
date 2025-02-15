import { ESortType } from '../../components/Sort/Sort.props'
import { IProductModel } from '../../interfaces/product.interface'

export type TSortActions = { type: ESortType }

export interface ISortReducerState {
  sort: ESortType
  products: IProductModel[]
}

export const sortReducer = (
  state: ISortReducerState,
  action: TSortActions
): ISortReducerState => {
  switch (action.type) {
    case ESortType.Rating:
      return {
        sort: ESortType.Rating,
        products: state.products.toSorted(
          (a, b) => b.initialRating - a.initialRating
        ),
      }
    case ESortType.Price:
      return {
        sort: ESortType.Price,
        products: state.products.toSorted((a, b) => a.price - b.price),
      }
    default:
      throw new Error('Неверный тип сортировки')
  }
}
