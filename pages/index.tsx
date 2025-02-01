import { Button, HTag, PTag, Tag } from '../components'

export default function Home(): JSX.Element {
  return (
    <div>
      <HTag tag="h1">Текст</HTag>
      <Button appearance="primary" arrow="right">
        Кнопка
      </Button>
      <Button appearance="ghost" arrow="down">
        Кнопка
      </Button>
      <PTag size="l">Большой</PTag>
      <PTag>Средний</PTag>
      <PTag size="s">Маленький</PTag>
      <Tag size="s">Ghost</Tag>
      <Tag size="s" color="red" href="https://www.google.com">
        Red
      </Tag>
      <Tag size="m" color="green">
        Green
      </Tag>
      <Tag color="primary">Primary</Tag>
    </div>
  )
}
