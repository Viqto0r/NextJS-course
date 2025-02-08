import { FC } from 'react'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import axios from 'axios'
import { withLayout } from '../../layout/Layout'
import { IMenuItem } from '../../interfaces/menu.interface'
import { firstLevelMenu } from '../../helpers/helpers'
import { ParsedUrlQuery } from 'node:querystring'

interface ITypeProps extends Record<string, unknown> {
  menu: IMenuItem[]
  firstCategory: number
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = firstLevelMenu.map((menuItem) => '/' + menuItem.route)

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<ITypeProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    }
  }

  const firstCategoryItem = firstLevelMenu.find(
    (menuItem) => menuItem.route === params.type
  )

  if (!firstCategoryItem) {
    return {
      notFound: true,
    }
  }

  const firstCategory = firstCategoryItem.id

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

const Type: FC<ITypeProps> = ({ firstCategory }) => {
  return <>Type: {firstCategory}</>
}

export default withLayout(Type)
