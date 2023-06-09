import { NextPage } from 'next'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Layout from '@/components/Layout'
import getUserByEmail from '@/services/users/getUserByEmail'
import { ApiContext } from '@/types'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import sendPasswordResetEmail from '@/services/email/sendPasswordResetEmail'

interface FormInput {
  email: string
}

const ResetPassword: NextPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>()

  const onSubmit = async (data: FormInput) => {
    try {
      const apiContext: ApiContext = {
        apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
      }
      const user = await getUserByEmail(apiContext, { email: data.email })
      // パスワードリセットメール送信処理をここで行う
      await sendPasswordResetEmail(apiContext, { email: data.email })

      toast.success('パスワードリセットメールを送信しました。')
      router.push('/password-reset-confirmation')
    } catch (error: any) {
      if (error.message === 'user not found') {
        toast.error('入力されたメールアドレスが存在しません。')
      } else {
        toast.error('エラーが発生しました。再度試してみてください。')
      }
    }
  }

  return (
    <Layout>
      <div className="pt-2 pb-2 px-2 md:px-0 justify-center flex">
        <div className="w-400px flex flex-col justify-center items-center">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-center">パスワード再設定</h1>
          </div>

          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register('email', { required: true })}
                type="email"
                placeholder="メールアドレス"
                className={`p-2 border rounded mb-2 w-full ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 pl-1">
                  メールアドレスは必須です
                </p>
              )}
              <button
                type="submit"
                className="p-2 border rounded mb-2 w-full bg-blue-500 text-white"
              >
                パスワード再設定メールを送信
              </button>
            </form>
            <div className="mt-4">
              <Link href="/signin">
                <p className="text-blue-500 hover:underline cursor-pointer">
                  サインイン画面に戻る
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ResetPassword
