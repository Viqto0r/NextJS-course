import { FC, KeyboardEvent, useContext } from 'react'
import styles from './Menu.module.css'
import { AppContext } from '../../context/app.context'
import { IFirstLevelMenuItem, IPageItem } from '../../interfaces/menu.interface'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { firstLevelMenu } from '../../helpers/helpers'
import { motion } from 'framer-motion'

export const Menu: FC = () => {
  const { menu, setMenu, firstCategory } = useContext(AppContext)
  const router = useRouter()

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    hidden: { marginBottom: 0 },
  }

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29,
    },
    hidden: { opacity: 0, height: 0 },
  }

  const openSecondLevel = (secondCategory: string) => {
    const updatedMenu = menu.map((menuItem) => {
      if (menuItem._id.secondCategory === secondCategory) {
        menuItem.isOpened = !menuItem.isOpened
      }

      return menuItem
    })

    setMenu?.(updatedMenu)
  }

  const openSecondLevelKey = (e: KeyboardEvent, category: string) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault()
      openSecondLevel(category)
    }
  }

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
        {menu.map((menuItem) => {
          const isActive = menuItem.pages
            .map((page) => page.alias)
            .includes(router.asPath.split('/')[2])

          if (isActive) {
            menuItem.isOpened = true
          }

          const { secondCategory } = menuItem._id
          const { isOpened = false } = menuItem

          return (
            <div key={secondCategory}>
              <div
                tabIndex={0}
                className={styles.secondLevel}
                onClick={() => openSecondLevel(secondCategory)}
                onKeyDown={(e: KeyboardEvent) =>
                  openSecondLevelKey(e, secondCategory)
                }
              >
                {secondCategory}
              </div>
              <motion.div
                layout
                variants={variants}
                initial={isOpened ? 'visible' : 'hidden'}
                animate={isOpened ? 'visible' : 'hidden'}
                className={styles.secondLevelBlock}
              >
                {buildThirdLevel(
                  menuItem.pages,
                  firstLevelMenuItem.route,
                  isOpened
                )}
              </motion.div>
            </div>
          )
        })}
      </div>
    )
  }

  const buildThirdLevel = (
    pages: IPageItem[],
    route: string,
    isOpened: boolean
  ) => {
    return pages.map((page) => {
      const href = `/${route}/${page.alias}`
      const isActive = href === router.asPath

      return (
        <motion.div key={page._id} variants={variantsChildren}>
          <Link href={href}>
            <a
              tabIndex={isOpened ? 0 : -1}
              className={cn(styles.thirdLevel, {
                [styles.thirdLevelActive]: isActive,
              })}
            >
              {page.category}
            </a>
          </Link>
        </motion.div>
      )
    })
  }

  return (
    <nav className={styles.menu} role="navigation">
      {buildFirstLevel()}
    </nav>
  )
}
