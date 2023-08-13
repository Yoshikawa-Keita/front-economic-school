import { useRef, useState } from 'react'
import ExamToggleButton from './ExamToggleButton'
import { useAuthContext } from '@/contexts/AuthContext'
import getSignedUrl from '@/services/auth/getSignedUrl'
import { ApiContext, Exam, UserExam } from '@/types'

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
  const [showPDF, setShowPDF] = useState(false)
  const [pdfUrl, setPdfUrl] = useState('')
  const pdfRef = useRef<HTMLIFrameElement>(null)

  const handleFullscreen = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const current: any = pdfRef.current

    if (current) {
      if (current.requestFullscreen) {
        current.requestFullscreen()
      } else if (current.mozRequestFullScreen) {
        // Firefox
        current.mozRequestFullScreen()
      } else if (current.webkitRequestFullscreen) {
        // Chrome, Safari & Operas
        current.webkitRequestFullscreen()
      } else if (current.msRequestFullscreen) {
        // IE/Edge
        current.msRequestFullscreen()
      }
    }
  }

  const handlePDFClick = async (url: string, e: React.MouseEvent) => {
    e.preventDefault()
    const context: ApiContext = {
      apiRootUrl:
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
    }
    const response = await getSignedUrl(context, { file_path: url })
    setPdfUrl(response.signed_url)
    setShowPDF(true)
  }

  const isExamCompleted = (examId: number) => {
    return completedExams.some(
      (completedExam) => completedExam.exam_id === examId,
    )
  }

  const renderLinkForAll = (url: string, text: string) => {
    if (!url.includes('undefined')) {
      if (
        checkUserType(1) ||
        checkUserType(2) ||
        checkUserType(3) ||
        checkUserType(4)
      ) {
        return (
          <a
            href="#"
            onClick={(e) => handlePDFClick(url, e)}
            className="text-blue-600 hover:underline"
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
        <span className="text-blue-600 opacity-50 cursor-not-allowed">{`${text} (To Be)`}</span>
      )
    }
  }

  const renderLinkForStd = (url: string, text: string) => {
    if (checkUserType(3) || checkUserType(4)) {
      if (!url.includes('undefined')) {
        return (
          <a
            href="#"
            onClick={(e) => handlePDFClick(url, e)}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        )
      } else {
        return (
          <span className="text-blue-600 opacity-50 cursor-not-allowed">{`${text} (To Be)`}</span>
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

  const renderLinkForPrm = (url: string, text: string) => {
    if (checkUserType(4)) {
      if (!url.includes('undefined')) {
        return (
          <a
            href="#"
            onClick={(e) => handlePDFClick(url, e)}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        )
      } else {
        return (
          <span className="text-blue-600 opacity-50 cursor-not-allowed">{`${text} (To Be)`}</span>
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
      {showPDF && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-md max-w-screen-lg mx-auto w-full relative">
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                ref={pdfRef} // pdfRefをiframeに関連付ける
                src={pdfUrl}
                className="absolute top-0 left-0 w-full h-full"
                style={{ border: 'none' }}
                title="PDF Document"
              ></iframe>
            </div>
            <button
              onClick={handleFullscreen}
              className="absolute bottom-4 right-4 text-white bg-blue-500 hover:bg-blue-700 p-2 rounded"
            >
              全画面表示
            </button>
            <button
              onClick={() => setShowPDF(false)}
              className="mt-2 text-white bg-blue-500 hover:bg-blue-700 p-2 rounded"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
      <h2 className="text-lg font-bold mb-4">{year}年度</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exams.map((exam, i) => (
          <div key={i} className="border border-gray-200 p-2 rounded-md">
            <h3>大問{exam.question_num}</h3>
            <div className="flex justify-between">
              {i === 0
                ? renderLinkForAll(
                    `${process.env.NEXT_PUBLIC_CLOUDFRONT_HOST}/${exam.university}/${exam.subject}/question/${exam.question_pdf_url}`,
                    '問題',
                  )
                : renderLinkForAll(
                    `${process.env.NEXT_PUBLIC_CLOUDFRONT_HOST}/${exam.university}/${exam.subject}/question/${exam.question_pdf_url}`,
                    '問題',
                  )}

              {i === 0
                ? renderLinkForAll(
                    `${process.env.NEXT_PUBLIC_CLOUDFRONT_HOST}/${exam.university}/${exam.subject}/answer/${exam.answer_pdf_url}`,
                    '解答',
                  )
                : renderLinkForStd(
                    `${process.env.NEXT_PUBLIC_CLOUDFRONT_HOST}/${exam.university}/${exam.subject}/answer/${exam.answer_pdf_url}`,
                    '解答',
                  )}

              {/* {i === 0
                ? renderLinkForAll(
                    `${process.env.NEXT_PUBLIC_CLOUDFRONT_HOST}/${exam.university}/${exam.subject}/critique/${exam.critique_url}`,
                    "講評"
                  )
                : renderLinkForStd(
                    `${process.env.NEXT_PUBLIC_CLOUDFRONT_HOST}/${exam.university}/${exam.subject}/critique/${exam.critique_url}`,
                    "講評"
                  )} */}

              {i === 0
                ? renderLinkForAll(
                    `${process.env.NEXT_PUBLIC_CLOUDFRONT_HOST}/${exam.video_url}`,
                    '動画',
                  )
                : renderLinkForPrm(
                    `${process.env.NEXT_PUBLIC_CLOUDFRONT_HOST}/${exam.video_url}`,
                    '動画',
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
