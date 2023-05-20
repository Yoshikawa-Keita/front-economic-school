// typesは後ほど定義
import { type } from 'os'
import Cookies from 'js-cookie'
import { cookies } from 'next/dist/client/components/headers'
import { Cookie } from 'next/font/google'
import { ApiContext, User } from '@/types'
// 先ほど定義したsrc/utils/index.tsから読み込み
import { fetcher } from '@/utils'

export type SignupParams = {
  /**
   * ユーザー名
   */
  username: string
  /**
   * フルネーム
   */
  fullName: string
  /**
   * メールアドレス
   */
  email: string
  /**
   * ユーザータイプ
   */
  userType: number
  /**
   * パスワード
   */
  password: string

  /**
   * ユーザープロフィール
   */
  profileImage: File | null
}

type SignupResponse = {
  user: User
}

/**
 * 認証API（サインイン）
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns ログインユーザー
 */
const signup = async (
  context: ApiContext,
  params: SignupParams,
): Promise<SignupResponse> => {
  const payload: any = { ...params }

  // If profileImage exists, convert it to Base64
  if (params.profileImage) {
    payload.profile_file = await convertFileToBase64(params.profileImage)
    delete payload.profileImage // remove the original profileImage field
  }

  const response: SignupResponse = await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/v1/create_user`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  )

  return response
}

async function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      // Remove the "data:" URL scheme part
      const base64Data = (reader.result as string).split(',')[1]
      resolve(base64Data)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default signup
