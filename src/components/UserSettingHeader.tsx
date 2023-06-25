import Link from 'next/link'
import { useRouter } from 'next/router'

const UserSettingHeader = () => {
  const router = useRouter()

  return (
    <div className="flex justify-around items-center bg-white shadow-md rounded-lg p-6 mb-4">
      <Link href="/settings/profile">
        <div
          className={`cursor-pointer text-lg font-semibold px-6 py-2 rounded-lg transition-colors duration-200 ${
            router.pathname === '/settings/profile'
              ? 'bg-blue-500 text-white'
              : 'text-blue-500 hover:bg-blue-100'
          }`}
        >
          プロフィール設定
        </div>
      </Link>
      <Link href="/settings/account">
        <div
          className={`cursor-pointer text-lg font-semibold px-6 py-2 rounded-lg transition-colors duration-200 ${
            router.pathname === '/settings/account'
              ? 'bg-blue-500 text-white'
              : 'text-blue-500 hover:bg-blue-100'
          }`}
        >
          アカウント設定
        </div>
      </Link>
    </div>
  )
}

export default UserSettingHeader
