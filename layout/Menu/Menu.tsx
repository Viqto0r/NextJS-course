import { FC, useContext } from 'react'
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

          return (
            <div key={secondCategory}>
              <div
                className={styles.secondLevel}
                onClick={() => openSecondLevel(secondCategory)}
              >
                {secondCategory}
              </div>
              <motion.div
                layout
                variants={variants}
                initial={menuItem.isOpened ? 'visible' : 'hidden'}
                animate={menuItem.isOpened ? 'visible' : 'hidden'}
                className={styles.secondLevelBlock}
              >
                {buildThirdLevel(menuItem.pages, firstLevelMenuItem.route)}
              </motion.div>
            </div>
          )
        })}
      </div>
    )
  }

  const buildThirdLevel = (pages: IPageItem[], route: string) => {
    return pages.map((page) => {
      const href = `/${route}/${page.alias}`
      const isActive = href === router.asPath

      return (
        <motion.div key={page._id} variants={variantsChildren}>
          <Link href={href}>
            <a
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

  return <menu className={styles.menu}>{buildFirstLevel()}</menu>
}
