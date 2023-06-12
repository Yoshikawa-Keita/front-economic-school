// typesは後ほど定義
import { type } from 'os'
import Cookies from 'js-cookie'
import { cookies } from 'next/dist/client/components/headers'
import { Cookie } from 'next/font/google'
import { ApiContext, User } from '@/types'
// 先ほど定義したsrc/utils/index.tsから読み込み
import { fetcher } from '@/utils'

export type SigninParams = {
  /**
   * ユーザー名
   * サンプルユーザーのユーザー名は "user"
   */
  username: string
  /**
   * パスワード
   * サンプルユーザーのパスワードは "password"
   */
  password: string
}

type SigninResponse = {
  user: User
  session_id: string
  access_token: string
  refresh_token: string
  access_token_expires_at: Date
  refresh_token_expires_at: Date
}

/**
 * 認証API（サインイン）
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns ログインユーザー
 */
const signin = async (
  context: ApiContext,
  params: SigninParams,
): Promise<SigninResponse> => {
  const response: SigninResponse = await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/v1/login_user`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  )
  Cookies.set('accessToken', response.access_token)
  Cookies.set('refreshToken', response.refresh_token)
  Cookies.set('user', JSON.stringify(response.user))
  return response
}

export default signin
