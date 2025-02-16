import { FC } from 'react'
import { GetStaticProps } from 'next'
import axios from 'axios'
import { IMenuItem } from '../interfaces/menu.interface'
import { withLayout } from '../layout/Layout'
import { API } from '../helpers/api'

interface ISearchProps extends Record<string, unknown> {
  menu: IMenuItem[]
  firstCategory: number
}

export const getStaticProps: GetStaticProps<ISearchProps> = async () => {
  const firstCategory = 0

  const { data: menu } = await axios.post<IMenuItem[]>(API.topPage.find, {
    firstCategory,
  })

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
