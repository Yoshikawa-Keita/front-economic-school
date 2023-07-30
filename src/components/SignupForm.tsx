import { useForm } from 'react-hook-form';
import FileUploader from './FileUploader';

export type SignupFormData = {
  username: string;
  fullName: string;
  email: string;
  password: string;
  profileImage: FileList;
};

interface SignupFormProps {
  onSignup?: (
    username: string,
    fullName: string,
    email: string,
    userType: number,
    password: string,
    profileImage: File | null,
  ) => void;
}

const SignupForm = ({ onSignup }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignupFormData>();

  const profileImage = watch('profileImage');
  const onSubmit = (data: SignupFormData) => {
    const { username, fullName, email, password, profileImage } = data;
    const userType = 0; // デフォルトの画像URL
    let imageUrl = 'default_profile_image.jpg';

    // ユーザーが画像をアップロードした場合
    if (profileImage && profileImage[0]) {
      const file = profileImage[0];
      imageUrl = `${username}.${file.name.split('.').pop()}`;
    }

    // ユーザーが画像をアップロードしなかった場合にデフォルトの画像を使用する
    const finalProfileImage =
      profileImage && profileImage[0] ? profileImage[0] : null;

    onSignup &&
      onSignup(
        username,
        fullName,
        email,
        userType,
        password,
        finalProfileImage,
      );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-center mb-6">
          新規登録フォーム
        </h1>
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="username"
        >
          ユーザー名（変更不可）
        </label>
        <input
          {...register('username', {
            required: true,
            minLength: 3,
            maxLength: 10,
            pattern: /^[a-z0-9]+$/i,
          })}
          id="username"
          type="text"
          placeholder="3-10文字の半角英数字(小文字)"
          className={`w-full px-3 py-2 border ${
            errors.username ? 'border-red-500' : 'border-gray-300'
          } rounded`}
        />
        {errors.username && (
          <p className="text-xs text-red-500">入力が不正です</p>
        )}
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="fullName"
        >
          表示名
        </label>
        <input
          {...register('fullName', {
            required: true,
            minLength: 3,
            maxLength: 10,
            pattern: /^[a-z0-9]+$/i,
          })}
          id="fullName"
          type="text"
          placeholder="3-10文字の半角英数字"
          className={`w-full px-3 py-2 border ${
            errors.fullName ? 'border-red-500' : 'border-gray-300'
          } rounded`}
        />
        {errors.fullName && (
          <p className="text-xs text-red-500">入力が不正です</p>
        )}
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="email"
        >
          メールアドレス
        </label>
        <input
          {...register('email', { required: true })}
          id="email"
          type="email"
          placeholder="メールアドレス"
          className={`w-full px-3 py-2 border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } rounded`}
        />
        {errors.email && <p className="text-xs text-red-500">入力が必要です</p>}
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="password"
        >
          パスワード
        </label>
        <input
          {...register('password', { required: true, minLength: 6 })}
          id="password"
          type="password"
          placeholder="6文字以上"
          className={`w-full px-3 py-2 border ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          } rounded`}
        />
        {errors.password && (
          <p className="text-xs text-red-500">
            {errors.password.type === 'required'
              ? '入力が必要です'
              : '6文字以上で入力してください'}
          </p>
        )}
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="profileImage"
        >
          プロフィール画像をアップロード
        </label>
        <FileUploader
          onFileSelect={(files: FileList) => setValue('profileImage', files)}
          message="※ 画像は後で設定/変更可能です"
          accept=".jpg,.jpeg,.png"
        />
        {errors.profileImage && (
          <p className="text-xs text-red-500">
            プロフィール画像のアップロードに問題があります
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
  );
};

export default SignupForm;
