import { ApiContext, GlobalRanking } from '@/types'
import { fetcher } from '@/utils'
import Cookies from 'js-cookie'

export type GetGlobalRankingResponse = {
  rankings: GlobalRanking[]
}

const getGlobalRanking = async (
  context: ApiContext,
): Promise<GetGlobalRankingResponse> => {
  const response: GetGlobalRankingResponse = await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/v1/get_global_ranking`,
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

export default getGlobalRanking
