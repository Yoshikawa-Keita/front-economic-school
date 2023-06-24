import { ApiContext, WeeklyUniversityRanking } from '@/types'
import { fetcher } from '@/utils'
import Cookies from 'js-cookie'

export type GetWeeklyUniversityRankingResponse = {
  rankings: WeeklyUniversityRanking[]
}

const getWeeklyUniversityRanking = async (
  context: ApiContext,
): Promise<GetWeeklyUniversityRankingResponse> => {
  const response: GetWeeklyUniversityRankingResponse = await fetcher(
    `${context.apiRootUrl.replace(
      /\/$/g,
      '',
    )}/v1/get_weekly_university_ranking`,
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

export default getWeeklyUniversityRanking
