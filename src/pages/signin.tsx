import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AppLogo from '@/components/AppLogo'
import Layout from '@/components/Layout'
import SigninFormContainer from '@/containers/SigninFormContainer'
import { ApiContext } from '@/types'
import signin from '@/services/auth/signin'

const Signin: NextPage = () => {
  const router = useRouter()

  const handleSignin = async (err?: Error) => {
    if (!err) {
      const redirectTo = (router.query['redirect_to'] as string) ?? '/'
      await router.push(redirectTo)
    }
  }

  const handleEasySignin = async () => {
    const context: ApiContext = {
      apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
    }
    const testUsername = 'testuser'
    const testPassword = 'secret'
    await signin(context, { username: testUsername, password: testPassword })

    const redirectTo = (router.query['redirect_to'] as string) ?? '/'
    await router.push(redirectTo)
  }

  return (
    <Layout>
      <div className="pt-2 pb-2 px-2 md:px-0 flex justify-center">
        <div className="w-full sm:w-400px flex flex-col items-center">
          <div className="mb-4">
            <AppLogo />
          </div>
          <SigninFormContainer onSignin={handleSignin} />
          <div className="mt-2">
            <button
              onClick={handleEasySignin}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              　テストユーザーでログイン
            </button>
          </div>
          <div className="mt-4">
            <Link href="/signup">
              <p className="text-blue-500 hover:underline cursor-pointer">
                新規登録はこちらから
              </p>
            </Link>
          </div>
          <div className="mt-2">
            <Link href="/reset-password">
              <p className="text-blue-500 hover:underline cursor-pointer">
                パスワードを再設定する
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Signin
