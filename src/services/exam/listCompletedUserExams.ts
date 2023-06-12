import Cookies from 'js-cookie'
import { ApiContext, UserExam } from '@/types'
import { fetcher } from '@/utils'

export type ListCompletedUserExamsParams = {
  /**
   * ユーザー名
   */
  username: string
  /**
   * 大学名
   */
  university?: string
}

type ListCompletedUserExamsResponse = {
  user_exams: UserExam[]
}

/**
 * 完了した試験のリストの取得API
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns 完了した試験のリスト
 */
const listCompletedUserExams = async (
  context: ApiContext,
  params: ListCompletedUserExamsParams,
): Promise<ListCompletedUserExamsResponse> => {
  const response: ListCompletedUserExamsResponse = await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/v1/list_completed_user_exams/${
      params.username
    }`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
    },
  )

  return response
}

export default listCompletedUserExams
