import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="pt-3 pb-2">
      <div className="flex flex-col md:flex-row">
        <div className="min-w-full md:min-w-30 pr-0 md:pr-1">
          <nav>
            <div className="mb-2">
              <Link href="/">トップ</Link>
            </div>
            <div className="mb-2">
              <Link href="/">採用</Link>
            </div>
            <div className="mb-2">
              <Link href="/">お知らせ</Link>
            </div>
          </nav>
        </div>
      </div>
      <div className="pt-3 pb-2">
        <p>© {currentYear} Economic School All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
