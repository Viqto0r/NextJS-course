import { FC } from 'react'
import { withLayout } from '../layout/Layout'
import { H } from '../components'

export const Error404: FC = () => {
  return <H tag="h1">Ошибка 404</H>
}

export default withLayout(Error404)
