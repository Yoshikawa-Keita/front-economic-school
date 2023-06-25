import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AppLogo from '@/components/AppLogo'
import Layout from '@/components/Layout'
import SigninFormContainer from '@/containers/SigninFormContainer'

const Signin: NextPage = () => {
  const router = useRouter()
  // 認証後のイベントハンドラ
  const handleSignin = async (err?: Error) => {
    if (!err) {
      // サインインに成功し、クエリが指定されている場合はそのURLに移動。
      // デフォルトはトップページに移動。
      const redirectTo = (router.query['redirect_to'] as string) ?? '/'

      console.log('Redirecting', redirectTo)
      await router.push(redirectTo)
    }
  }

  return (
    <Layout>
      <div className="pt-2 pb-2 px-2 md:px-0 justify-center flex">
        <div className="w-400px flex flex-col justify-center items-center">
          <div className="mb-2">
            <AppLogo />
          </div>
          <div className="w-full">
            {/*
        サインインフォームコンテナ
        SigninFormのユーザー名・パスワードから認証APIを呼び出し、
        onSigninコールバックが呼び出される
      */}

            <SigninFormContainer onSignin={handleSignin} />
            <div className="mt-2">
              <Link href="/signup">新規登録はこちらから</Link>
            </div>
            <div className="mt-2">
              <Link href="/reset-password">パスワードを再設定する</Link>
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Signin
