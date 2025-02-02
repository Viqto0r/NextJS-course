import { FC } from 'react'
import { ILayoutProps } from './Layout.props'
import { Header } from './Header/Header'
import { Sidebar } from './Sidebar/Sidebar'
import { Footer } from './Footer/Footer'
import styles from './Layout.module.css'

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div className={styles.body}>{children}</div>
      <Footer className={styles.footer} />
    </div>
  )
}

export const withLayout = <T extends Record<string, unknown>>(
  Component: FC<T>
) => {
  return (props: T): JSX.Element => {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    )
  }
}
