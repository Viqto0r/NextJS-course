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
import { TopPageComponent } from '../../page-components'
import { API } from '../../helpers/api'
import Head from 'next/head'

interface ITopPageProps extends Record<string, unknown> {
  menu: IMenuItem[]
  firstCategory: ETopLevelCategory
  page: ITopPageModel
  products: IProductModel[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = []

  for (const menuItem of firstLevelMenu) {
    const { data: menu } = await axios.post<IMenuItem[]>(API.topPage.find, {
      firstCategory: menuItem.id,
    })

    paths = paths.concat(
      menu.flatMap((m) => m.pages.map((p) => `/${menuItem.route}/${p.alias}`))
    )
  }

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<ITopPageProps> = async ({
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
    const { data: menu } = await axios.post<IMenuItem[]>(API.topPage.find, {
      firstCategory,
    })

    if (menu.length === 0) {
      return {
        notFound: true,
      }
    }

    const { data: page } = await axios.get<ITopPageModel>(
      `${API.topPage.byAlias}${params.alias}`
    )

    const { data: products } = await axios.post<IProductModel[]>(
      API.product.find,
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

function TopPage({
  firstCategory,
  page,
  products,
}: ITopPageProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:type" content="article" />
      </Head>
      <TopPageComponent
        firstCategory={firstCategory}
        page={page}
        products={products}
      />
    </>
  )
}

export default withLayout(TopPage)
