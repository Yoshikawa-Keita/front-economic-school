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
      // // サインアップに成功し、クエリが指定されている場合はそのURLに移動。
      // // デフォルトはサインインページに移動。
      // const redirectTo = (router.query['redirect_to'] as string) ?? '/signin'

      // console.log('Redirecting', redirectTo)
      // await router.push(redirectTo)
      console.log('Redirecting to email verification page')
      await router.push('/email-verification-pending')
    }
  }
  return (
    <Layout>
      <div className="flex justify-center ">
        <SignupFormContainer onSignup={handleSignup} />
        <Link href="/signin">ログインはこちらから</Link>
      </div>
    </Layout>
  )
}

export default Signup
