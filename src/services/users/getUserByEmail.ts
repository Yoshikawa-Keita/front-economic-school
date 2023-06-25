import type { ApiContext, User } from '@/types'
import { fetcher } from '@/utils'

export type GetUserByEmailParam = {
  email: string
}

/**
 * ユーザーAPI（個別取得）
 * @param context APIコンテキスト
 * @param GetUserByEmailParam パラメータ
 * @returns ユーザー
 */
const getUserByEmail = async (
  context: ApiContext,
  { email }: GetUserByEmailParam,
): Promise<User> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/v1/get_user_by_email/${email}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
}

export default getUserByEmail
