import SigninForm from '@/components/SigninForm'
import { useAuthContext } from '@/contexts/AuthContext'
import { useGlobalSpinnerActionsContext } from '@/contexts/GlobalSpinnerContext'
import { toast } from 'react-toastify'

interface SigninFormContainerProps {
  /**
   * サインインした時に呼ばれるイベントハンドラ
   */
  onSignin: (error?: Error) => void
}

/**
 * サインインフォームコンテナ
 */
const SigninFormContainer = ({ onSignin }: SigninFormContainerProps) => {
  const { signin } = useAuthContext()
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  // サインインボタンを押された時のイベントハンドラ
  const handleSignin = async (username: string, password: string) => {
    try {
      // ローディングスピナーを表示する
      setGlobalSpinner(true)
      await signin(username, password)

      onSignin && onSignin()
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errorMessage = err.message
        if (errorMessage === 'user not found') {
          toast.error('該当のユーザーは存在しません')
        } else if (errorMessage === 'invalid parameters') {
          toast.error('不正な入力値です')
        } else if (errorMessage === 'incorrect password') {
          toast.error('パスワードが違います')
        } else {
          window.alert(errorMessage)
        }
        onSignin && onSignin(err)
      }
    } finally {
      setGlobalSpinner(false)
    }
  }

  return <SigninForm onSignin={handleSignin} />
}

export default SigninFormContainer
