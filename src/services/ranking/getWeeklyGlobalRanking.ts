import { ApiContext, WeeklyGlobalRanking } from '@/types'
import { fetcher } from '@/utils'
import Cookies from 'js-cookie'

export type GetWeeklyGlobalRankingResponse = {
  rankings: WeeklyGlobalRanking[]
}

const getWeeklyGlobalRanking = async (
  context: ApiContext,
): Promise<GetWeeklyGlobalRankingResponse> => {
  const response: GetWeeklyGlobalRankingResponse = await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/v1/get_weekly_global_ranking`,
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

export default getWeeklyGlobalRanking
