import { Dispatch, HTMLAttributes, SetStateAction } from 'react'
import { FieldError } from 'react-hook-form'

export interface IRatingProps extends HTMLAttributes<HTMLDivElement> {
  isEditable?: boolean
  rating: number
  setRating?: Dispatch<SetStateAction<number>>
  error?: FieldError
}
