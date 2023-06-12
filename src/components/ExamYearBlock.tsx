import { useEffect, useState } from 'react'
import EditableToggleButton from './EditableToggleButton'
import ExamToggleButton from './ExamToggleButton'
import { useAuthContext } from '@/contexts/AuthContext'
import getSignedUrl from '@/services/auth/getSignedUrl'
import { ApiContext, Exam, User, UserExam } from '@/types'

type ExamYearBlockProps = {
  year: number
  exams: Exam[]
  completedExams: UserExam[]
  fetchCompletedExams: () => Promise<void>
}

const ExamYearBlock: React.FC<ExamYearBlockProps> = ({
  year,
  exams,
  completedExams,
  fetchCompletedExams,
}) => {
  const { authUser } = useAuthContext()
  const checkUserType = (userType: number) => {
    return authUser && authUser.user_type === userType
  }
  const handleLinkClick = async (url: string, e: React.MouseEvent) => {
    e.preventDefault() // デフォルトのリンク動作をキャンセル
    const context: ApiContext = {
      apiRootUrl: process.env.API_BASE_URL || 'http://localhost:8080',
    }
    const response = await getSignedUrl(context, { file_path: url })
    window.open(response.signed_url, '_blank') // 新しいタブで署名付きURLを開く
  }
  const isExamCompleted = (examId: number) => {
    return completedExams.some(
      (completedExam) => completedExam.exam_id === examId,
    )
  }

  const renderLinkForAll = (url: string, text: string) => {
    if (!url.includes('undefined')) {
      // const context: ApiContext = {
      //     apiRootUrl: process.env.API_BASE_URL || 'http://localhost:8080',
      // }
      if (checkUserType(1) || checkUserType(2)) {
        // const response = await getSignedUrl(context, {file_path: url})
        return (
          <a
            href="#"
            onClick={(e) => handleLinkClick(url, e)}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        )
      }
      return (
        <span className="text-blue-600 opacity-50 cursor-not-allowed">
          {text}
        </span>
      )
    } else {
      return (
        <span className="text-blue-600 opacity-50 cursor-not-allowed">{`${text} (Coming Soon...)`}</span>
      )
    }
  }

  const renderLinkForOne = (url: string, text: string) => {
    if (checkUserType(2)) {
      if (!url.includes('undefined')) {
        return (
          <a
            href={url}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        )
      } else {
        return (
          <span className="text-blue-600 opacity-50 cursor-not-allowed">{`${text} (Coming Soon...)`}</span>
        )
      }
    } else {
      return (
        <div>
          <span className="text-blue-600 opacity-50 cursor-not-allowed">
            {text}
          </span>
          <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">
            会員限定
          </span>
        </div>
      )
    }
  }

  return (
    <div className="border border-gray-300 p-4 mb-8 rounded-md">
      <h2 className="text-lg font-bold mb-4">{year}年度</h2>
      <div className="grid grid-cols-2 gap-4">
        {exams.map((exam, i) => (
          <div key={i} className="border border-gray-200 p-2 rounded-md">
            <h3>大問{exam.question_num}</h3>
            <div className="flex justify-between">
              {renderLinkForAll(
                `${process.env.NEXT_PUBLIC_CLOUDFRONT_HOST}/${exam.university}/${exam.subject}/question/${exam.question_pdf_url}`,
                '問題',
              )}
              {renderLinkForAll(
                `${process.env.NEXT_PUBLIC_CLOUDFRONT_HOST}/${exam.university}/${exam.subject}/answer/${exam.answer_pdf_url}`,
                '解答',
              )}
              {renderLinkForAll(
                `${process.env.NEXT_PUBLIC_CLOUDFRONT_HOST}/${exam.university}/${exam.subject}/critique/${exam.critique_url}`,
                '講評',
              )}
              {renderLinkForOne(
                `${process.env.NEXT_PUBLIC_CLOUDFRONT_HOST}/${exam.video_url}`,
                '解説動画',
              )}
              {authUser && (
                <ExamToggleButton
                  username={authUser.username}
                  examId={exam.exam_id}
                  university={exam.university}
                  initialIsActive={isExamCompleted(exam.exam_id)}
                  fetchCompletedExams={fetchCompletedExams}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExamYearBlock
