import { FC, useContext } from 'react'
import styles from './Menu.module.css'
import { AppContext } from '../../context/app.context'

export const Menu: FC = () => {
  const { menu } = useContext(AppContext)

  return (
    <menu>
      <ul>
        {menu.map((m) => (
          <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
        ))}
      </ul>
    </menu>
  )
}
