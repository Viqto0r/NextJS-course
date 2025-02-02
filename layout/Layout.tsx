import { FC } from 'react'
import { ILayoutProps } from './Layout.props'
import { Header } from './Header/Header'
import { Sidebar } from './Sidebar/Sidebar'
import { Footer } from './Footer/Footer'

export const Layout: FC<ILayoutProps> = ({ children }) => {
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
