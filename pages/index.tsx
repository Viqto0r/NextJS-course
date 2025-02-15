import { useState } from 'react'
import { Button, H, Input, P, Rating, Tag, Textarea } from '../components'
import { withLayout } from '../layout/Layout'
import { GetStaticProps } from 'next'
import axios from 'axios'
import { IMenuItem } from '../interfaces/menu.interface'

interface IHomeProps extends Record<string, unknown> {
  menu: IMenuItem[]
  firstCategory: number
}

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
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

function Home({ menu }: IHomeProps): JSX.Element {
  const [rating, setRating] = useState(4)

  return (
    <>
      <H tag="h1">Текст</H>
      <Button appearance="primary" arrow="right">
        Кнопка
      </Button>
      <Button appearance="ghost" arrow="down">
        Кнопка
      </Button>
      <P size="l">Большой</P>
      <P>Средний</P>
      <P size="s">Маленький</P>
      <Tag size="s" color="ghost">
        Ghost
      </Tag>
      <Tag size="s" color="red" href="https://www.google.com">
        Red
      </Tag>
      <Tag size="m" color="green">
        Green
      </Tag>
      <Tag color="primary">Primary</Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
      <Input placeholder="Test" />
      <br />
      <Textarea placeholder="Test" />
    </>
  )
}

export default withLayout(Home)
