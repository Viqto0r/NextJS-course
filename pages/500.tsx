import { FC } from 'react'
import { withLayout } from '../layout/Layout'
import { H } from '../components'

const Error500: FC = () => {
  return <H tag="h1">Ошибка 500</H>
}

export default withLayout(Error500)
