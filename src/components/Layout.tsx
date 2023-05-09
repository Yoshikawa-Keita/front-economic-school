import Footer from './Footer'
import Header from './Header'
import Separator from './Separator'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Separator space={4} />
      <div className="p-4">
        <Footer />
      </div>
    </>
  )
}

export default Layout
