import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { useAuthGuard } from '@/utils/hooks'
import getGlobalRanking, {
  GetGlobalRankingResponse,
} from '@/services/ranking/getGlobalRanking'
import getWeeklyGlobalRanking, {
  GetWeeklyGlobalRankingResponse,
} from '@/services/ranking/getWeeklyGlobalRanking'
import getUniversityRanking, {
  GetUniversityRankingResponse,
} from '@/services/ranking/getUniversityRanking'
import getWeeklyUniversityRanking, {
  GetWeeklyUniversityRankingResponse,
} from '@/services/ranking/getWeeklyUniversityRanking'
import { ApiContext } from '@/types'
import { listUniversities } from '@/services/exam/listUnivercities'
import { IoMdTrophy } from 'react-icons/io'
import RankingIcon from '@/components/RankingIcon'
import useTranslation from 'next-translate/useTranslation'

const Ranking: React.FC = () => {
  useAuthGuard()

  const [timeSpan, setTimeSpan] = useState<'total' | 'weekly'>('total')
  const [rankingType, setRankingType] = useState<'global' | 'university'>(
    'global',
  )
  const [university, setUniversity] = useState<string>('')
  const [globalRankingData, setGlobalRankingData] =
    useState<GetGlobalRankingResponse>({ rankings: [] })
  const [weeklyGlobalRankingData, setWeeklyGlobalRankingData] =
    useState<GetWeeklyGlobalRankingResponse>({ rankings: [] })
  const [universityRankingData, setUniversityRankingData] =
    useState<GetUniversityRankingResponse>({ rankings: [] })
  const [weeklyUniversityRankingData, setWeeklyUniversityRankingData] =
    useState<GetWeeklyUniversityRankingResponse>({ rankings: [] })

  const [univList, setUnivList] = useState<string[]>()
  const { t } = useTranslation('common')

  useEffect(() => {
    const fetchData = async () => {
      const apiContext: ApiContext = {
        apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
      }
      if (timeSpan === 'total' && rankingType === 'global') {
        const result = await getGlobalRanking(apiContext)
        setGlobalRankingData(result)
      } else if (timeSpan === 'weekly' && rankingType === 'global') {
        const result = await getWeeklyGlobalRanking(apiContext)
        setWeeklyGlobalRankingData(result)
      } else if (timeSpan === 'total' && rankingType === 'university') {
        const result = await getUniversityRanking(apiContext)
        setUniversityRankingData(result)
      } else {
        const result = await getWeeklyUniversityRanking(apiContext)
        setWeeklyUniversityRankingData(result)
      }
      const univRes = await listUniversities(apiContext)
      setUnivList(univRes.universities)
    }

    fetchData()
  }, [timeSpan, rankingType, university])

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-4xl mb-4 text-center text-white bg-blue-300">
          ランキング
        </h1>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setTimeSpan('total')}
            className={`px-4 py-2 mx-2 ${
              timeSpan === 'total'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black'
            }`}
          >
            全期間
          </button>
          <button
            onClick={() => setTimeSpan('weekly')}
            className={`px-4 py-2 mx-2 ${
              timeSpan === 'weekly'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black'
            }`}
          >
            週間
          </button>
        </div>
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setRankingType('global')}
            className={`px-4 py-2 mx-2 ${
              rankingType === 'global'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black'
            }`}
          >
            総合
          </button>
          <button
            onClick={() => setRankingType('university')}
            className={`px-4 py-2 mx-2 ${
              rankingType === 'university'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black'
            }`}
          >
            大学別
          </button>
        </div>

        {rankingType === 'university' && (
          <div className="flex justify-center mb-4">
            <select
              onChange={(e) => setUniversity(e.target.value)}
              className="border px-2 py-1"
            >
              <option value="" disabled selected>
                {t('university.select')}
              </option>
              {univList?.map((univ) => (
                <option key={univ} value={univ}>
                  {t(`university.${univ}`)}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex justify-center">
          <div className="divide-y-2 divide-gray-300 max-w-xl mx-auto">
            {rankingType === 'global' &&
              timeSpan === 'total' &&
              globalRankingData?.rankings?.map((rank, i) => (
                <div
                  key={rank.ranking}
                  className={`p-4 grid grid-cols-4 gap-4 items-center justify-center border-2 border-gray-300 rounded-md my-2 ${
                    i % 2 === 0 ? 'bg-white-200' : 'bg-gray-100'
                  }`}
                >
                  <div className="flex justify-center border-r-2 border-gray-300">
                    {rank.ranking <= 3 && (
                      <IoMdTrophy
                        size={24}
                        color={
                          rank.ranking === 1
                            ? 'gold'
                            : rank.ranking === 2
                            ? 'silver'
                            : rank.ranking === 3
                            ? '#CD7F32'
                            : 'gray'
                        }
                      />
                    )}
                    <p>{rank.ranking} 位</p>
                  </div>
                  <div className="flex justify-center">
                    <RankingIcon username={rank.username} />
                  </div>
                  <div className="flex justify-center border-r-2 border-gray-300">
                    <h2 className="text-xl w-24 overflow-hidden text-overflow">
                      {rank.username}
                    </h2>
                  </div>
                  <div className="flex justify-center">
                    <p>達成数: {rank.num_completed_exams}</p>
                  </div>
                </div>
              ))}
            {rankingType === 'global' &&
              timeSpan === 'weekly' &&
              weeklyGlobalRankingData?.rankings?.map((rank, i) => (
                <div
                  key={rank.ranking}
                  className={`p-4 grid grid-cols-4 gap-4 items-center justify-center border-2 border-gray-300 rounded-md my-2 ${
                    i % 2 === 0 ? 'bg-white-200' : 'bg-gray-100'
                  }`}
                >
                  <div className="flex justify-center border-r-2 border-gray-300">
                    {rank.ranking <= 3 && (
                      <IoMdTrophy
                        size={24}
                        color={
                          rank.ranking === 1
                            ? 'gold'
                            : rank.ranking === 2
                            ? 'silver'
                            : rank.ranking === 3
                            ? '#CD7F32'
                            : 'gray'
                        }
                      />
                    )}
                    <p>{rank.ranking} 位</p>
                  </div>
                  <div className="flex justify-center">
                    <RankingIcon username={rank.username} />
                  </div>
                  <div className="flex justify-center border-r-2 border-gray-300">
                    <h2 className="text-xl w-24 overflow-hidden text-overflow">
                      {rank.username}
                    </h2>
                  </div>
                  <div className="flex justify-center">
                    <p>達成数: {rank.completed_exams_count}</p>
                  </div>
                </div>
              ))}
            {rankingType === 'university' &&
              timeSpan === 'total' &&
              universityRankingData?.rankings
                ?.filter((rank) => rank.university === university)
                ?.map((rank, i) => (
                  <div
                    key={rank.ranking}
                    className={`p-4 grid grid-cols-4 gap-4 items-center justify-center border-2 border-gray-300 rounded-md my-2 ${
                      i % 2 === 0 ? 'bg-white-200' : 'bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-center border-r-2 border-gray-300">
                      {rank.ranking <= 3 && (
                        <IoMdTrophy
                          size={24}
                          color={
                            rank.ranking === 1
                              ? 'gold'
                              : rank.ranking === 2
                              ? 'silver'
                              : rank.ranking === 3
                              ? '#CD7F32'
                              : 'gray'
                          }
                        />
                      )}
                      <p>{rank.ranking} 位</p>
                    </div>
                    <div className="flex justify-center">
                      <RankingIcon username={rank.username} />
                    </div>
                    <div className="flex justify-center border-r-2 border-gray-300">
                      <h2 className="text-xl w-24 overflow-hidden text-overflow">
                        {rank.username}
                      </h2>
                    </div>
                    <div className="flex justify-center">
                      <p>達成数: {rank.num_completed_exams}</p>
                    </div>
                  </div>
                ))}

            {rankingType === 'university' &&
              timeSpan === 'weekly' &&
              weeklyUniversityRankingData?.rankings
                ?.filter((rank) => rank.university === university)
                ?.map((rank, i) => (
                  <div
                    key={rank.ranking}
                    className={`p-4 grid grid-cols-4 gap-4 items-center justify-center border-2 border-gray-300 rounded-md my-2 ${
                      i % 2 === 0 ? 'bg-white-200' : 'bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-center border-r-2 border-gray-300">
                      {rank.ranking <= 3 && (
                        <IoMdTrophy
                          size={24}
                          color={
                            rank.ranking === 1
                              ? 'gold'
                              : rank.ranking === 2
                              ? 'silver'
                              : rank.ranking === 3
                              ? '#CD7F32'
                              : 'gray'
                          }
                        />
                      )}
                      <p>{rank.ranking} 位</p>
                    </div>
                    <div className="flex justify-center">
                      <RankingIcon username={rank.username} />
                    </div>
                    <div className="flex justify-center border-r-2 border-gray-300">
                      <h2 className="text-xl w-24 overflow-hidden text-overflow">
                        {rank.username}
                      </h2>
                    </div>
                    <div className="flex justify-center">
                      <p>達成数: {rank.completed_exams_count}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Ranking
