import Cookies from 'js-cookie'
import { ApiContext, User } from '@/types'
import { fetcher } from '@/utils'

export type UpdateUserEmailParams = {
  /**
   * ユーザー名
   */
  username: string
  /**
   * メールアドレス
   */
  email: string
}

type UpdateUserResponse = {
  user: User
}

/**
 * ユーザーメールアドレス更新API
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns 更新されたユーザー
 */
const updateUserEmail = async (
  context: ApiContext,
  params: UpdateUserEmailParams,
): Promise<UpdateUserResponse> => {
  const response: UpdateUserResponse = await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/v1/update_user_email`,
    {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
      body: JSON.stringify(params),
    },
  )

  Cookies.set('user', JSON.stringify(response.user))

  return response
}

export default updateUserEmail
