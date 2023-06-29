import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import EditableToggleButton from './EditableToggleButton'
import { ApiContext, User } from '@/types'
import updateUserEmail from '@/services/users/updateUserEmail'
import ConfirmModal from '@/components/ConfirmModal'
import { toast } from 'react-toastify'

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
  const [showModal, setShowModal] = useState(false)
  const newData = useRef<UserAccountData | null>(null)

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
    newData.current = data
    setShowModal(true)
  }

  const confirmUpdate = () => {
    if (!newData.current) return

    const { email } = newData.current
    const username = authUser.username

    updateUserEmail(context, {
      username,
      email,
    })
      .then(() => {
        // On success
        onUpdate && onUpdate()
      })
      .catch((err: unknown) => {
        // On error
        if (err instanceof Error) {
          if (err.message === 'email already registered') {
            toast.error('このメールアドレスは既に登録されています')
          } else {
            toast.error(err.message)
          }
          onUpdate && onUpdate(err)
        }
      })

    setShowModal(false)
  }

  return (
    <div className="flex flex-col items-center justify-start bg-gray-100 py-2">
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
            disabled={!isEmailEditable}
            className={`${
              isEmailEditable
                ? 'bg-blue-500 hover:bg-blue-700'
                : 'bg-gray-500 cursor-not-allowed'
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            更新する
          </button>
        </div>
      </form>
      <ConfirmModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmUpdate}
        title="更新確認"
        body="アカウント情報を更新してもよろしいですか？"
      />
    </div>
  )
}

export default UserAccount
