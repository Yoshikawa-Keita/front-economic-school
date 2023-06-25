import type { ApiContext, User } from '@/types'
import { fetcher } from '@/utils'

export type GetUserByUsernameParam = {
  username: string
}

/**
 * ユーザーAPI（個別取得）
 * @param context APIコンテキスト
 * @param GetUserByUsernameParam パラメータ
 * @returns ユーザー
 */
const getUserByUsername = async (
  context: ApiContext,
  { username }: GetUserByUsernameParam,
): Promise<User> => {
  return await fetcher(
    `${context.apiRootUrl.replace(
      /\/$/g,
      '',
    )}/v1/get_user_by_username/${username}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
}

export default getUserByUsername
