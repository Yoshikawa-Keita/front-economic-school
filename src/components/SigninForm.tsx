import { useForm } from 'react-hook-form'

export type SigninFormData = {
  username: string
  password: string
}

interface SigninFormProps {
  onSignin?: (username: string, password: string) => void
}

const SigninForm = ({ onSignin }: SigninFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>()
  const onSubmit = (data: SigninFormData) => {
    const { username, password } = data

    onSignin && onSignin(username, password)
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
      <div className="mb-2">
        <input
          {...register('password', { required: true })}
          name="password"
          type="password"
          placeholder="パスワード"
          className={`w-full px-3 py-2 border ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          } rounded`}
        />
        {errors.password && (
          <p className="text-xs text-red-500 pl-1">パスワードは必須です</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded"
      >
        サインイン
      </button>
    </form>
  )
}

export default SigninForm
