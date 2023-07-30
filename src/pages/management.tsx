import useTranslation from 'next-translate/useTranslation'
import { useState, useEffect } from 'react'
import ExamCompletionChart from '@/components/ExamCompletionChart'
import Layout from '@/components/Layout'
import { useAuthContext } from '@/contexts/AuthContext'
import { getExamCountByUniversity } from '@/services/exam/getExamCountByUniversity'
import listCompletedUserExams from '@/services/exam/listCompletedUserExams'
import { ApiContext, Exam, ExamCountByUniversity, UserExam } from '@/types'
import { useAuthGuard } from '@/utils/hooks'

const Management = () => {
  useAuthGuard()
  const { authUser } = useAuthContext()

  const [examCountByUnivercity, setExamCountByUnivercity] = useState<
    ExamCountByUniversity[]
  >([])
  const fetchExamCountByUniv = async () => {
    const apiContext: ApiContext = {
      apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
    }
    const response = await getExamCountByUniversity(apiContext)
    const examCntByUniv = response?.examCountByUniversity || []
    setExamCountByUnivercity(examCntByUniv)
  }

  const [completedExams, setCompletedExams] = useState<UserExam[]>([])
  const fetchUserExams = async () => {
    if (authUser?.username) {
      const apiContext: ApiContext = {
        apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
      }
      const params = {
        username: authUser.username,
      }

      const response = await listCompletedUserExams(apiContext, params)
      const userExams = response?.user_exams || []
      setCompletedExams(userExams)
    }
  }

  useEffect(() => {
    fetchUserExams()
    fetchExamCountByUniv()
  }, [])

  const { t } = useTranslation('common')

  return (
    <Layout>
      <div className="width-auto">
        <h1 className="flex justify-center text-white bg-blue-300 text-4xl m-4">
          学習管理
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          {examCountByUnivercity.map((examCntByUniv) => {
            let completed = 0
            let notCompleted = 0
            completedExams.map((examUser) => {
              completed = completedExams.filter(
                (examUser) => examUser.university === examCntByUniv.university,
              ).length
              notCompleted = examCntByUniv.count - completed
            })

            return (
              <div
                key={examCntByUniv.university}
                className="border border-gray-300 rounded-lg overflow-hidden min-h-[500px] bg-blue-50"
              >
                <h2 className="text-center text-blue-700 p-4 text-3xl">
                  {t(`university.${examCntByUniv.university}`)}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  <div className="p-4 flex justify-center items-center">
                    <div className="w-full h-full">
                      <ExamCompletionChart
                        size="w-full h-full"
                        completed={completed}
                        notCompleted={notCompleted}
                        university={examCntByUniv.university}
                      />
                    </div>
                  </div>
                  <div className="p-4 text-center md:self-center">
                    <p className="text-lg mb-4">
                      <strong>達成率：</strong>
                      {completed + notCompleted > 0
                        ? (
                            (completed / (completed + notCompleted)) *
                            100
                          ).toFixed(2)
                        : 0}
                      %
                    </p>
                    <p className="text-lg mb-4">
                      <strong>完了数：</strong>
                      {completed}
                    </p>
                    <p className="text-lg mb-4">
                      <strong>総数：</strong>
                      {completed + notCompleted}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Management
