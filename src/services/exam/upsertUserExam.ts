import { ApiContext, UserExam } from '@/types'
import { fetcher } from '@/utils'
import Cookies from 'js-cookie'

export type UpsertUserExamParams = {
  /**
   * ユーザーID
   */
  username: string
  /**
   * examID
   */
  exam_id: number
  /**
   * 大学
   */
  university: string
  /**
   * Examの完了状態
   */
  is_completed: boolean
}

type UpsertUserExamResponse = {
  userExam: UserExam
}

/**
 * Examの完了状態のアップサートAPI
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns アップサートされたUserExam
 */
const upsertUserExam = async (
  context: ApiContext,
  params: UpsertUserExamParams,
): Promise<UpsertUserExamResponse> => {

  const response: UpsertUserExamResponse = await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/v1/upsert_user_exam`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('accessToken')}`
      },
      body: JSON.stringify(params),
    },
  )

  return response
}

export default upsertUserExam
