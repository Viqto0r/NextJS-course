import { FC, KeyboardEvent, useContext, useState } from 'react'
import styles from './Menu.module.css'
import { AppContext } from '../../context/app.context'
import { IFirstLevelMenuItem, IPageItem } from '../../interfaces/menu.interface'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { firstLevelMenu } from '../../helpers/helpers'
import { motion, useReducedMotion } from 'framer-motion'

export const Menu: FC = () => {
  const { menu, setMenu, firstCategory } = useContext(AppContext)
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>()
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion
        ? {}
        : {
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
    hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 },
  }

  const openSecondLevel = (secondCategory: string) => {
    const updatedMenu = menu.map((menuItem) => {
      if (menuItem._id.secondCategory === secondCategory) {
        setAnnounce(menuItem.isOpened ? 'closed' : 'opened')
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

  const buildFirstLevel = () => (
    <ul className={styles.firstLevelList}>
      {firstLevelMenu.map((firstLevelMenuItem) => {
        const firstLevelActive = firstLevelMenuItem.id === firstCategory

        return (
          <li key={firstLevelMenuItem.id} aria-expanded={firstLevelActive}>
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
          </li>
        )
      })}
    </ul>
  )

  const buildSecondLevel = (firstLevelMenuItem: IFirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
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
            <li key={secondCategory}>
              <button
                className={styles.secondLevel}
                onClick={() => openSecondLevel(secondCategory)}
                onKeyDown={(e: KeyboardEvent) =>
                  openSecondLevelKey(e, secondCategory)
                }
                aria-expanded={isOpened}
              >
                {secondCategory}
              </button>
              <motion.ul
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
              </motion.ul>
            </li>
          )
        })}
      </ul>
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
        <motion.li key={page._id} variants={variantsChildren}>
          <Link href={href}>
            <a
              tabIndex={isOpened ? 0 : -1}
              className={cn(styles.thirdLevel, {
                [styles.thirdLevelActive]: isActive,
              })}
              aria-current={isActive}
            >
              {page.category}
            </a>
          </Link>
        </motion.li>
      )
    })
  }

  return (
    <nav className={styles.menu} role="navigation">
      {announce && (
        <span className="visuallyHidden" role="log">
          {announce === 'opened' ? 'развёрнуто' : 'свёрнуто'}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  )
}
