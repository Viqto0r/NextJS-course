import { TextareaHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

export interface ITextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError
}
