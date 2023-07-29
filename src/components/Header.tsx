import { Person } from '@mui/icons-material'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import Cookies from 'js-cookie'
import Link from 'next/link'
import Icon from '../../public/images/userIcon.png'
import AppLogo from './AppLogo'
import UserIcon from './UserIcon'
import { useAuthContext } from '@/contexts/AuthContext'
import { useState } from 'react'
import { FaBars } from 'react-icons/fa'

/**
 * ヘッダー
 */
const Header = () => {
  const { authUser, isLoading } = useAuthContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="p-2 md:p-3 flex justify-between sticky top-0 z-50 bg-white">
      <div className="flex items-center">
        <button
          className="lg:hidden mr-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars />
        </button>
        <nav className="h-14 flex items-center ml-8 gap-7 lg:flex hidden">
          <Link href="/">
            <AppLogo />
          </Link>
          <Link href="/university">過去問データベース</Link>
          <Link href="/management">学習管理</Link>
          <Link href="/ranking">ランキング</Link>
        </nav>
      </div>

      <nav className="h-14 px-4 md:px-24 flex items-center gap-4">
        {(() => {
          // 認証していたらアイコンを表示
          if (authUser) {
            return (
              <div className="mt-4 inline-block text-center">
                <UserIcon imageUrl={authUser.profile_image_url} />
                <p className="mt-0 mx-auto">{authUser.username}</p>
              </div>
            )
          } else if (isLoading) {
            return <div>now Loading...</div>
          } else {
            // サインインしてない場合はアイコンを表示
            return (
              <Link href="/signin">
                <Person />
              </Link>
            )
          }
        })()}
      </nav>
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white z-50 p-4 shadow-lg transition-transform transform translate-x-0 ease-out duration-300 lg:translate-x-full">
          <button className="mb-4" onClick={() => setIsMenuOpen(false)}>
            <span className="text-xl font-bold">✕</span>
          </button>
          <Link href="/" className="block text-lg py-2 hover:bg-gray-200">
            ホーム
          </Link>
          <Link
            href="/university"
            className="block text-lg py-2 hover:bg-gray-200"
          >
            過去問データベース
          </Link>
          <Link
            href="/management"
            className="block text-lg py-2 hover:bg-gray-200"
          >
            学習管理
          </Link>
          <Link
            href="/ranking"
            className="block text-lg py-2 hover:bg-gray-200"
          >
            ランキング
          </Link>
          {/* 他のリンクやコンテンツ */}
        </div>
      )}
    </header>
  )
}

export default Header
