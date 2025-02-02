import { FC } from 'react'
import { ILayoutProps } from './Layout.props'
import { Header } from './Header/Header'
import { Sidebar } from './Sidebar/Sidebar'
import { Footer } from './Footer/Footer'

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div>
        <Sidebar />
        <div>{children}</div>
      </div>
      <Footer />
    </>
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
