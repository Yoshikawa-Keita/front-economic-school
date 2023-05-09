import Image from 'next/image'
import Link from 'next/link'

import Icon from '../../public/images/userIcon.png'

import React, { useState } from 'react'
import signout from '@/services/auth/signout'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useAuthContext } from '@/contexts/AuthContext'



interface UserIconProps {
  size?: number
  imageUrl: string
}

const UserIcon = ({ size, imageUrl }: UserIconProps) => {
  const { authUser, isLoading } = useAuthContext()
  const [showSubMenu, setShowSubMenu] = useState(false)

  const handleClick = () => {
    setShowSubMenu(!showSubMenu)
  }
  const router = useRouter()
  // サインアウト後のイベントハンドラ
  const handleSignout = async (err?: Error) => {
    if (!err) {
      await router.push("/signin")
    }
  } 
    
  return (
    <div>
    <div onClick={handleClick}>
        <Image
          src={Icon}
          width="24"
          height="24"
          className="rounded-full w-12 h-12 border border-blue-400"
          alt="UserIcon"
        />
      </div>
      {showSubMenu && (
        <div className="absolute bg-white shadow-md py-2 mt-1 rounded">
          <Link href={`/users/${authUser?.username}`} className="block px-4 py-2 text-black hover:bg-gray-200">
            マイページ
          </Link>
          <Link href="/settings" className="block px-4 py-2 text-black hover:bg-gray-200">
            設定
          </Link>
          <hr className="border-gray-300" />
          <button
            className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200"
            onClick={() => {
             Cookies.remove("user")
             Cookies.remove("accessToken")
             router.push("/signin")
            }}
          >
            ログアウト
          </button>
        </div>
      )}
    </div>
  )
}

export default UserIcon
