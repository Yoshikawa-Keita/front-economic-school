import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useMemo, useState } from 'react'
import ExamYearBlock from '@/components/ExamYearBlock'
import Layout from '@/components/Layout'
import { useAuthContext } from '@/contexts/AuthContext'
import listCompletedUserExams from '@/services/exam/listCompletedUserExams'
import listExams from '@/services/exam/listExams'
import { ApiContext, Exam, UserExam } from '@/types'

type ExamPageProps = {
  exams: Exam[]
  initialFlg: boolean
}

const ExamPage: NextPage<ExamPageProps> = ({ exams, initialFlg }) => {
  // 各年度ごとに試験をグループ化
  const examsByYear = exams.reduce((groups, exam) => {
    const key = exam.year
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(exam)
    return groups
  }, {} as Record<number, Exam[]>)

  const universityName =
    exams.length > 0 ? exams[0].university : 'Default University'

  const universities = useMemo(() => {
    const uniqueUniversities = Array.from(
      new Set(exams.map((exam) => exam.university)),
    )
    return uniqueUniversities
  }, [exams])

  const { t } = useTranslation('common')

  const [completedExams, setCompletedExams] = useState<UserExam[]>([])
  const { authUser } = useAuthContext()
  const router = useRouter()
  const fetchCompletedExams = async () => {
    if (authUser?.username) {
      const apiContext: ApiContext = {
        apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
      }

      const params = {
        username: authUser.username,
        // university: universityName
      }

      const response = await listCompletedUserExams(apiContext, params)
      const userExams = response?.user_exams || []
      setCompletedExams(userExams)
    }
  }

  useEffect(() => {
    fetchCompletedExams()
  }, [router.asPath, universityName])

  return (
    <Layout>
      <div className="width-auto　flex justify-center">
        <h1 className="flex justify-center text-white bg-blue-300 text-4xl m-4">
          過去問データベース
        </h1>

        {initialFlg && (
          <div className="university-nav p-5">
            <h3 className="text-2xl font-bold text-center text-blue-700 mb-5">
              大学一覧
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {universities.map((university) => (
                <li
                  key={university}
                  className="rounded shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                  <Link
                    href={`/university/${encodeURIComponent(university)}`}
                    className="block p-4 text-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    {t(`university.${university}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!initialFlg && (
          <>
            <div className="flex justify-center">
              <h2 className="inline-flex justify-center text-white bg-blue-300 text-3xl m-3 px-3">
                {exams[0] && t(`university.${universityName}`)}
              </h2>
            </div>

            {Object.entries(examsByYear)
              .sort((a, b) => Number(b[0]) - Number(a[0]))
              .map(([year, exams]) => (
                <ExamYearBlock
                  key={year}
                  year={Number(year)}
                  exams={exams}
                  completedExams={completedExams}
                  fetchCompletedExams={fetchCompletedExams}
                />
              ))}
          </>
        )}
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:8080',
  }
  const examsRes = await listExams(context, {})

  // Examsがundefinedやnullの場合、空の配列として扱います。
  const exams = examsRes?.exams || []

  const paths = exams.map((exam) => ({
    params: { slug: [exam.university] },
  }))

  // 全ての大学を一覧表示するパスも含める
  paths.push({ params: { slug: [] } })

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:8080',
  }

  const slug = params?.slug || []
  let exams: Exam[] = []
  let initialFlg = false

  if (slug.length === 0) {
    // slugが空の場合（つまり、/university ページの場合）は全ての大学を取得
    const examsRes = await listExams(context, {})
    exams = examsRes.exams
    initialFlg = true
  } else {
    // それ以外の場合は特定の大学のみを取得
    const examsRes = await listExams(context, { university: slug[0] })
    exams = examsRes.exams
  }
  return {
    props: {
      exams: exams || [],
      initialFlg: initialFlg,
    },
    revalidate: 60 * 60 * 24,
  }
}

export default ExamPage
