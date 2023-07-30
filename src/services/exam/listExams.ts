import Cookies from 'js-cookie'
import type { ApiContext, Exam } from '@/types'
import { fetcher } from '@/utils'

export type ListExamsParams = {
  /**
   * 大学名
   */
  university?: string
  /**
   * 科目
   */
  subject?: string
  /**
   * 年度
   */
  year?: number
}

type ListExamsResponse = {
  exams: Exam[]
}

/**
 * 試験情報取得API
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns 取得された試験リスト
 */
const listExams = async (
  context: ApiContext,
  params: ListExamsParams,
): Promise<ListExamsResponse> => {
  // パラメータをクエリ文字列に変換
  const query = new URLSearchParams(params as any).toString()

  const response: ListExamsResponse = await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/v1/list_exams?${query}`,
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

export default listExams
