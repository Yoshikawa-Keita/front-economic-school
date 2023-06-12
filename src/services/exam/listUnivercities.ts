import type { ApiContext, Exam } from '@/types'
import { fetcher } from '@/utils'
import Cookies from 'js-cookie'

export type ListUniversitiesResponse = {
  universities: string[]
}

const listUniversities = async (
  context: ApiContext,
): Promise<ListUniversitiesResponse> => {
  const response: ListUniversitiesResponse = await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/v1/list_universities`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('accessToken')}`
      },
    },
  )

  return response
}

export { listUniversities }
