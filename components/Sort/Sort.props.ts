import { HTMLAttributes } from 'react'

export enum ESortType {
  Rating,
  Price,
}

export interface ISortProps extends HTMLAttributes<HTMLDivElement> {
  sort: ESortType
  setSort: (sortVariant: ESortType) => void
}
