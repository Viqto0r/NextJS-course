import { HTMLAttributes } from 'react'

export interface IRatingProps extends HTMLAttributes<HTMLDivElement> {
  isEditable?: boolean
  rating: number
  setRating?: (rating: number) => void
}
