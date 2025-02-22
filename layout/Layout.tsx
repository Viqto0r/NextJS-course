import { FC, KeyboardEvent, useRef, useState } from 'react'
import { ILayoutProps } from './Layout.props'
import { Header } from './Header/Header'
import { Sidebar } from './Sidebar/Sidebar'
import { Footer } from './Footer/Footer'
import styles from './Layout.module.css'
import { AppContextProvider, IAppContext } from '../context/app.context'
import { Up } from '../components'
import cn from 'classnames'

const Layout: FC<ILayoutProps> = ({ children }) => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const skipContentAction = (e: KeyboardEvent) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault()
      bodyRef.current?.focus()
    }

    setIsSkipLinkDisplayed(false)
  }

  return (
    <div className={styles.wrapper}>
      <a
        tabIndex={1}
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkipLinkDisplayed,
        })}
        onFocus={() => setIsSkipLinkDisplayed(true)}
        onKeyDown={skipContentAction}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div ref={bodyRef} className={styles.body} tabIndex={0}>
        {children}
      </div>
      <Footer className={styles.footer} />
      <Up />
    </div>
  )
}

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FC<T>
) => {
  return (props: T): JSX.Element => {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    )
  }
}
