import {
  createContext,
  FC,
  PropsWithChildren,
  ReactNode,
  useState,
} from 'react'
import { IMenuItem } from '../interfaces/menu.interface'
import { ETopLevelCategory } from '../interfaces/page.interface'

export interface IAppContext {
  menu: IMenuItem[]
  firstCategory: ETopLevelCategory
  setMenu?: (newMenu: IMenuItem[]) => void
}

export const AppContext = createContext<IAppContext>({
  menu: [],
  firstCategory: ETopLevelCategory.Courses,
})

export const AppContextProvider: FC<PropsWithChildren<IAppContext>> = ({
  children,
  menu,
  firstCategory,
}) => {
  const [menuState, setMenuState] = useState(menu)

  const setMenu = (newMenu: IMenuItem[]) => setMenuState(newMenu)

  return (
    <AppContext.Provider value={{ menu: menuState, firstCategory, setMenu }}>
      {children}
    </AppContext.Provider>
  )
}
