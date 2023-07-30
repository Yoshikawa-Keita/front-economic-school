import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import SignupForm from '@/components/SignupForm'
import SignupFormContainer from '@/containers/SignupFormContainer'

const Signup: NextPage = () => {
  const router = useRouter()
  // サインアップ後のイベントハンドラ
  const handleSignup = async (err?: Error) => {
    if (!err) {
      await router.push('/email-verification-pending')
    }
  }
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <SignupFormContainer onSignup={handleSignup} />
        <Link href="/signin" className="mt-4 text-blue-500 hover:underline">
          ログインはこちらから
        </Link>
      </div>
    </Layout>
  )
}

export default Signup
