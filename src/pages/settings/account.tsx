import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { getUserFromCookie } from '@/utils/helper'
import UserSettingHeader from '@/components/UserSettingHeader'
import UserAccount from '@/components/UserAccount'
import { toast } from 'react-toastify'

const Account: NextPage = () => {
  const router = useRouter()
  const authUser = getUserFromCookie()

  const onUpdate = async (err?: Error) => {
    if (!err) {
        toast.success('認証メールを送信しました', { autoClose: false });
      await router.push('/')
    }
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-4">
        <UserSettingHeader />
        <UserAccount authUser={authUser} onUpdate={onUpdate}></UserAccount>
      </div>
    </Layout>
  )
}

export default Account
