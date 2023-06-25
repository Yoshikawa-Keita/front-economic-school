import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import { useForm, Controller, useFormContext } from 'react-hook-form'
import SuccessCheckmark from '@/components/SuccessCheckmark'
import 'tailwindcss/tailwind.css'
import { ApiContext } from '@/types'
import passwordReset from '@/services/email/passwordResetMail'

interface FormInput {
  password: string
  passwordConfirmation: string
}

const PasswordReset = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormInput>()
  const password = useRef({})
  password.current = watch('password', '');

  const [resetStatus, setResetStatus] = useState('')

  const onSubmit = async (data: FormInput) => {
    const secretCode = router.query.secret_code as string
    const emailId = Number(router.query.email_id)

    const context: ApiContext = {
      apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
    }

    try {
      await passwordReset(context, {
        emailId,
        secretCode,
        password: data.password,
      })
      setResetStatus('success')

      setTimeout(() => {
        router.push('/signin')
      }, 2000)
    } catch (error) {
      setResetStatus('failed')
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-8">パスワードの再設定</h1>

      {resetStatus === '' && (
        <div className="bg-white p-8 rounded shadow-md w-full sm:w-1/2 lg:w-1/3">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <p className="text-sm text-gray-700">新しいパスワードを入力してください：</p>
            <input
              {...register('password', { required: true })}
              type="password"
              placeholder="新しいパスワード"
              className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <p className="text-red-500 text-xs">パスワードは必須です</p>}

            <p className="text-sm text-gray-700">パスワードを再度入力してください：</p>
            <input
              {...register('passwordConfirmation', { required: true, validate: value => value === password.current || "パスワードが一致していません" })}
              type="password"
              placeholder="パスワード（確認）"
              className={`w-full p-2 border rounded ${errors.passwordConfirmation ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.passwordConfirmation && <p className="text-red-500 text-xs">{errors.passwordConfirmation.message}</p>}

            <button type="submit" className="w-full p-2 border rounded bg-blue-500 text-white">パスワードをリセットする</button>
          </form>
        </div>
      )}
      {resetStatus === 'success' && <SuccessCheckmark />}
      {resetStatus === 'failed' && (
        <div className="text-red-500 text-lg font-semibold">
          パスワードのリセットに失敗しました。リンクが無効か期限切れかもしれません。<br/>
          再度サインアップ画面から再設定を行ってください。
        </div>
      )}
    </div>
  )
}

export default PasswordReset
