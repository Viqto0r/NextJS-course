import { FC, useContext } from 'react'
import styles from './Menu.module.css'
import { AppContext } from '../../context/app.context'
import { IFirstLevelMenuItem, IPageItem } from '../../interfaces/menu.interface'
import CoursesIcon from './icons/courses.svg'
import ServicesIcon from './icons/services.svg'
import BooksIcon from './icons/books.svg'
import ProductsIcon from './icons/products.svg'
import { ETopLevelCategory } from '../../interfaces/page.interface'
import cn from 'classnames'
import Link from 'next/link'

const firstLevelMenu: IFirstLevelMenuItem[] = [
  {
    route: 'courses',
    name: 'Курсы',
    icon: <CoursesIcon />,
    id: ETopLevelCategory.Courses,
  },
  {
    route: 'services',
    name: 'Сервисы',
    icon: <ServicesIcon />,
    id: ETopLevelCategory.Services,
  },
  {
    route: 'books',
    name: 'Книги',
    icon: <BooksIcon />,
    id: ETopLevelCategory.Books,
  },
  {
    route: 'products',
    name: 'Продукты',
    icon: <ProductsIcon />,
    id: ETopLevelCategory.Products,
  },
]

export const Menu: FC = () => {
  const { menu, setMenu, firstCategory } = useContext(AppContext)

  const buildFirstLevel = () => {
    return firstLevelMenu.map((firstLevelMenuItem) => {
      const firstLevelActive = firstLevelMenuItem.id === firstCategory

      return (
        <div key={firstLevelMenuItem.id}>
          <Link href={`/${firstLevelMenuItem.route}`}>
            <a>
              <div
                className={cn(styles.firstLevel, {
                  [styles.firstLevelActive]: firstLevelActive,
                })}
              >
                {firstLevelMenuItem.icon}
                <span>{firstLevelMenuItem.name}</span>
              </div>
            </a>
          </Link>
          {firstLevelActive && buildSecondLevel(firstLevelMenuItem)}
        </div>
      )
    })
  }

  const buildSecondLevel = (firstLevelMenuItem: IFirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map((menuItem) => (
          <div key={menuItem._id.secondCategory}>
            <div className={styles.secondLevel}>
              {menuItem._id.secondCategory}
            </div>
            <div
              className={cn(styles.secondLevelBlock, {
                [styles.secondLevelBlockOpened]: menuItem.isOpened,
              })}
            >
              {buildThirdLevel(menuItem.pages, firstLevelMenuItem.route)}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const buildThirdLevel = (pages: IPageItem[], route: string) => {
    return pages.map((page) => (
      <Link href={`/${route}/${page.alias}`}>
        <a
          key={page.alias}
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: false,
          })}
        >
          {page.category}
        </a>
      </Link>
    ))
  }

  return <menu className={styles.menu}>{buildFirstLevel()}</menu>
}
