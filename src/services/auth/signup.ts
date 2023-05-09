// typesは後ほど定義
import { ApiContext, User } from '@/types'
// 先ほど定義したsrc/utils/index.tsから読み込み
import { fetcher } from '@/utils'
import { cookies } from 'next/dist/client/components/headers'
import Cookies from 'js-cookie';
import { Cookie } from 'next/font/google'
import { type } from 'os'

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
    console.log(params)
  const response:SignupResponse =  await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/v1/create_user`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
    
  )

  return response;
  
}

export default signup
