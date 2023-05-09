import { useForm } from 'react-hook-form'
import FileUploader from './FileUploader'

export type SignupFormData = {
  username: string
  fullName: string
  email: string
  password: string
}

interface SignupFormProps {
  onSignup?: (username: string, fullName: string, email: string, userType: number, password: string) => void
}

const SignupForm = ({ onSignup }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>()
  const onSubmit = (data: SignupFormData) => {
    const { username, fullName, email, password } = data
    const userType = 0

    onSignup && onSignup(username, fullName, email, userType, password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-1">
        <input
          {...register('username', { required: true })}
          name="username"
          type="text"
          placeholder="ユーザー名"
          className={`w-full px-3 py-2 border ${
            errors.username ? 'border-red-500' : 'border-gray-300'
          } rounded`}
        />
        {errors.username && (
          <p className="text-xs text-red-500 pl-1">ユーザー名は必須です</p>
        )}
      </div>
      <div className="mb-1">
        <input
          {...register('fullName', { required: true })}
          name="fullName"
          type="text"
          placeholder="フルネーム"
          className={`w-full px-3 py-2 border ${
            errors.fullName ? 'border-red-500' : 'border-gray-300'
          } rounded`}
        />
        {errors.fullName && (
          <p className="text-xs text-red-500 pl-1">フルネームは必須です</p>
        )}
      </div>
      <div className="mb-1">
        <input
          {...register('email', { required: true })}
          name="email"
          type="email"
          placeholder="メールアドレス"
          className={`w-full px-3 py-2 border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } rounded`}
        />
        {errors.email && (
          <p className="text-xs text-red-500 pl-1">メールアドレスは必須です</p>
        )}
      </div>
      <div className="mb-2">
        <input
          {...register('password', { required: true, minLength: 6 })}
          name="password"
          type="password"
          placeholder="パスワード"
          className={`w-full px-3 py-2 border ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          } rounded`}
        />
        {errors.password && (
          <p className="text-xs text-red-500 pl-1">
            {errors.password.type === 'required'
              ? 'パスワードは必須です'
              : 'パスワードは6文字以上で入力してください'}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded"
      >
           サインアップ
      </button>
    </form>
  )
}

export default SignupForm