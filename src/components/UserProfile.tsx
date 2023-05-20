import { useState } from 'react'
import { useForm } from 'react-hook-form'
import EditableToggleButton from './EditableToggleButton'
import FileUploader from './FileUploader'
import { useAuthContext } from '@/contexts/AuthContext'
import { ApiContext, User } from '@/types'
import { getUserFromCookie } from '@/utils/helper'
import updateUser from '@/services/users/updateUser'

export type UserProfileData = {
  fullName: string
  email: string
  // password: string
  profileImage: FileList
}

interface UserProfileProps {
  authUser: User
  onUpdate?: (error?: Error) => void
}

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

const UserProfile = ({ authUser, onUpdate }: UserProfileProps) => {
  //const { authUser, isLoading } = useAuthContext()
  const [isEmailEditable, setEmailEditable] = useState(false)
  //const [isPasswordEditable, setPasswordEditable] = useState(false)
  //const authUser = getUserFromCookie()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserProfileData>({
    defaultValues: {
      fullName: authUser?.full_name || '',
      email: authUser?.email || '',
      // password: ''
    },
  })

  const profileImage = watch('profileImage')
  const onSubmit = (data: UserProfileData) => {
    const { fullName, email, profileImage } = data
    const imageUrl = 'default_profile_image.jpg'

    const username = authUser.username

    try {

    // ユーザーが画像をアップロードしなかった場合にデフォルトの画像を使用する
    const finalProfileImage =
      profileImage && profileImage[0] ? profileImage[0] : null
      
    updateUser(context, {
      username,
      fullName,
      email,
      profileImage: finalProfileImage
    })

    // if (profileImage && profileImage[0]) {
    //   const file = profileImage[0];
    //   imageUrl = `${username}.${file.name.split('.').pop()}`;
    // }

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
      <h1 className="text-2xl font-bold mb-5">プロフィール編集</h1>
      <p className="mb-2">ユーザー名: {authUser?.username}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fullName"
          >
            フルネーム:
          </label>
          <input
            {...register('fullName', { required: true })}
            name="fullName"
            type="text"
            placeholder="フルネーム"
            className={`shadow appearance-none border ${
              errors.fullName ? 'border-red-500' : 'border-gray-200'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs italic">フルネームは必須です</p>
          )}
        </div>
        {/* <div className="mb-4">
          <EditableToggleButton
            isActive={isEmailEditable}
            onToggle={() => setEmailEditable(isEmailEditable =>　!isEmailEditable)}
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
        </div> */}
        {/* <div className="mb-4">
          <EditableToggleButton
            isActive={isPasswordEditable}
            onToggle={() => setPasswordEditable(isPasswordEditable =>　!isPasswordEditable)}
            id="password-toggle"
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            パスワード:
          </label>
          <input
            {...register('password', { required: true, minLength: 6 })}
            name="password"
            type="password"
            placeholder="パスワードを変更する場合に入力"
            disabled={!isPasswordEditable}
            className={`shadow appearance-none border ${
              errors.password ? 'border-red-500' : 'border-gray-200'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              {errors.password.type === 'required'
                ? 'パスワードは必須です'
                : 'パスワードは6文字以上で入力してください'}
            </p>
          )}
        </div> */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="profileImage"
          >
           
          </label>
          <FileUploader
            onFileSelect={(files: FileList) => {
              setValue('profileImage', files)
            }}
            message="※ 変更したい時のみアップロードしてください"
            accept=".jpg,.jpeg,.png"
          />
          {errors.profileImage && (
            <p className="text-red-500 text-xs italic">
              プロフィール画像のアップロードに問題があります
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

export default UserProfile
