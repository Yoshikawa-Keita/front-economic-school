import SignupForm from '@/components/SignupForm'
import { useGlobalSpinnerActionsContext } from '@/contexts/GlobalSpinnerContext'
import signup from '@/services/auth/signup'
import { ApiContext } from '@/types'
import { toast } from 'react-toastify'

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
        const errorMessage = err.message
        if (errorMessage === 'user not found') {
          // toast.error('該当のユーザーは存在しません');
        } else if (errorMessage === 'invalid parameters') {
          toast.error('不正な入力値です')
        } else if (errorMessage.includes('username already exists')) {
          toast.error(
            'そのユーザーネームまたはメールアドレスはすでに使用されています',
          )
        } else {
          window.alert(errorMessage)
        }
        onSignup && onSignup(err)
      }
    } finally {
      setGlobalSpinner(false)
    }
  }

  return <SignupForm onSignup={handleSignin} />
}

export default SignupFormContainer
