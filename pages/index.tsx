import { Button, HTag } from '../components'

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
    </div>
  )
}
