import { useState } from 'react'
import { useForm } from 'react-hook-form'
import EditableToggleButton from './EditableToggleButton'
import { ApiContext, User } from '@/types'
import updateUser from '@/services/users/updateUser'

export type UserAccountData = {
  email: string
}

interface UserAccountProps {
  authUser: User
  onUpdate?: (error?: Error) => void
}

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

const UserAccount = ({ authUser, onUpdate }: UserAccountProps) => {
  const [isEmailEditable, setEmailEditable] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAccountData>({
    defaultValues: {
      email: authUser?.email || '',
    },
  })

  const onSubmit = (data: UserAccountData) => {
    const { email } = data
    const username = authUser.username

    try {
      updateUser(context, {
        username,
        email,
      })

      onUpdate && onUpdate()
    } catch (err: unknown) {
      if (err instanceof Error) {
        // エラーの内容を表示
        window.alert(err.message)
        onUpdate && onUpdate(err)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 py-2">
      <h1 className="text-2xl font-bold mt-8 mb-5">アカウント編集</h1>
      <p className="mb-2">ユーザー名: {authUser?.username}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
        <div className="mb-4">
          <EditableToggleButton
            isActive={isEmailEditable}
            onToggle={() =>
              setEmailEditable((isEmailEditable) => !isEmailEditable)
            }
            id="email-toggle"
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            メールアドレス:
          </label>
          <input
            {...register('email', { required: true })}
            name="email"
            type="email"
            placeholder="メールアドレス"
            disabled={!isEmailEditable}
            className={`shadow appearance-none border ${
              errors.email ? 'border-red-500' : 'border-gray-200'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              メールアドレスは必須です
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            更新する
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserAccount
