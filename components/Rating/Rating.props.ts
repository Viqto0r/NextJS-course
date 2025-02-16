import { HTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

export interface IRatingProps extends HTMLAttributes<HTMLDivElement> {
  isEditable?: boolean
  rating: number
  setRating?: (rating: number) => void
  error?: FieldError
}
