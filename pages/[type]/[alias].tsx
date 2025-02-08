import axios from 'axios'
import { withLayout } from '../../layout/Layout'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { IMenuItem } from '../../interfaces/menu.interface'
import {
  ETopLevelCategory,
  ITopPageModel,
} from '../../interfaces/page.interface'
import { ParsedUrlQuery } from 'node:querystring'
import { IProductModel } from '../../interfaces/product.interface'
import { firstLevelMenu } from '../../helpers/helpers'

interface ICourseProps extends Record<string, unknown> {
  menu: IMenuItem[]
  firstCategory: ETopLevelCategory
  page: ITopPageModel
  products: IProductModel[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = []

  for (const menuItem of firstLevelMenu) {
    const { data: menu } = await axios.post<IMenuItem[]>(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
      { firstCategory: menuItem.id }
    )

    paths = paths.concat(
      menu.flatMap((m) => m.pages.map((p) => `/${menuItem.route}/${p.alias}`))
    )
  }

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<ICourseProps> = async ({
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

  try {
    const { data: menu } = await axios.post<IMenuItem[]>(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
      { firstCategory }
    )

    if (menu.length === 0) {
      return {
        notFound: true,
      }
    }

    const { data: page } = await axios.get<ITopPageModel>(
      process.env.NEXT_PUBLIC_DOMAIN + `/api/top-page/byAlias/${params.alias}`
    )

    const { data: products } = await axios.post<IProductModel[]>(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find',
      {
        category: page.category,
        limit: 10,
      }
    )

    return {
      props: {
        menu,
        firstCategory,
        page,
        products,
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

function Course({ menu, page, products }: ICourseProps): JSX.Element {
  return <>{products?.length}</>
}

export default withLayout(Course)
