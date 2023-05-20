import { Person } from '@mui/icons-material'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import Cookies from 'js-cookie'
import Link from 'next/link'
import Icon from '../../public/images/userIcon.png'
import AppLogo from './AppLogo'
import UserIcon from './UserIcon'
import { useAuthContext } from '@/contexts/AuthContext'

/**
 * ヘッダー
 */
const Header = () => {
  const { authUser } = useAuthContext()

  return (
    <header className="p-3 mr-24 flex justify-between">
      <nav className="h-14 flex items-center">
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <Link href="/">
            <AppLogo />
          </Link>
          <Link href="/circle">サークル</Link>
          <Link href="/video">動画</Link>
          <Link href="/management">学習管理</Link>
          <Link href="/ranking">ランキング</Link>
        </div>
      </nav>

      <nav className="h-14 flex items-center gap-4">
        <Link href="/like">
          <StarBorderIcon />
        </Link>
        {(() => {
          // 認証していたらアイコンを表示
          if (authUser) {
            return (
              <div className="mt-4 inline-block text-center">
                {/* <UserIcon imageUrl={"../../public/images/userIcon.png"} /> */}
                <UserIcon imageUrl={authUser.profile_image_url} />
                <p className="mt-0 mx-auto">{authUser.username}</p>
              </div>
            )
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
    </header>
  )
}

export default Header
