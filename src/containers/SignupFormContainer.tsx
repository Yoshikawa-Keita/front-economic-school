import SigninForm from '@/components/SigninForm'
import SignupForm from '@/components/SignupForm'
import { useAuthContext } from '@/contexts/AuthContext'
import { useGlobalSpinnerActionsContext } from '@/contexts/GlobalSpinnerContext'
import signup from '@/services/auth/signup'
import { ApiContext } from '@/types'

interface SignupFormContainerProps {
  /**
   * サインアップした時に呼ばれるイベントハンドラ
   */
  onSignup: (error?: Error) => void
}

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

/**
 * サインアップフォームコンテナ
 */
const SignupFormContainer = ({ onSignup }: SignupFormContainerProps) => {
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  // サインアップボタンを押された時のイベントハンドラ
  const handleSignin = async (
    username: string,
    fullName: string,
    email: string,
    userType: number,
    password: string,
    profileImage: File | null,
  ) => {
    try {
      // ローディングスピナーを表示する
      setGlobalSpinner(true)

      await signup(context, {
        username,
        fullName,
        email,
        userType,
        password,
        profileImage,
      })

      onSignup && onSignup()
    } catch (err: unknown) {
      if (err instanceof Error) {
        // エラーの内容を表示
        window.alert(err.message)
        onSignup && onSignup(err)
      }
    } finally {
      setGlobalSpinner(false)
    }
  }

  return <SignupForm onSignup={handleSignin} />
}

export default SignupFormContainer
