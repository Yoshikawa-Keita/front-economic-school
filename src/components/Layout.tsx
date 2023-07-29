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
      <main className="px-2 sm:px-4 md:px-8 lg:px-16">{children}</main>
      <Separator space={4} />
      <div className="p-2 sm:p-4 md:p-8">
        <Footer />
      </div>
    </>
  )
}

export default Layout
