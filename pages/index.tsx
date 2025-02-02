import { useState } from 'react'
import { Button, H, P, Rating, Tag } from '../components'
import { Layout } from '../layout/Layout'

export default function Home(): JSX.Element {
  const [rating, setRating] = useState(4)
  return (
    <Layout>
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
      <Tag size="s">Ghost</Tag>
      <Tag size="s" color="red" href="https://www.google.com">
        Red
      </Tag>
      <Tag size="m" color="green">
        Green
      </Tag>
      <Tag color="primary">Primary</Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
    </Layout>
  )
}
