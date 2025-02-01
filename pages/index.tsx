import { Button, HTag } from '../components'

export default function Home(): JSX.Element {
  return (
    <div>
      <HTag tag="h1">Текст</HTag>
      <Button appearance="primary">Кнопка</Button>
      <Button appearance="ghost">Кнопка</Button>
    </div>
  )
}
