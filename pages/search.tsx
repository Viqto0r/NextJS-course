import { FC } from 'react'
import { GetStaticProps } from 'next'
import axios from 'axios'
import { IMenuItem } from '../interfaces/menu.interface'
import { withLayout } from '../layout/Layout'

interface ISearchProps extends Record<string, unknown> {
  menu: IMenuItem[]
  firstCategory: number
}

export const getStaticProps: GetStaticProps<ISearchProps> = async () => {
  const firstCategory = 0

  const { data: menu } = await axios.post<IMenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    { firstCategory }
  )

  return {
    props: {
      menu,
      firstCategory,
    },
  }
}

const Search: FC = () => {
  return <>Search</>
}

export default withLayout(Search)
