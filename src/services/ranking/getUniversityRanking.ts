import { ApiContext, UniversityRanking } from '@/types'
import { fetcher } from '@/utils'
import Cookies from 'js-cookie'

export type GetUniversityRankingResponse = {
  rankings: UniversityRanking[]
}

const getUniversityRanking = async (
  context: ApiContext,
): Promise<GetUniversityRankingResponse> => {
  const response: GetUniversityRankingResponse = await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/v1/get_university_ranking`,
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

export default getUniversityRanking
