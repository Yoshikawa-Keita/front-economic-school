import React from 'react'

interface ExamProps {
  university: string
}
type ExamYear = {
  year: number
  exams: ExamItem[]
}

type ExamItem = {
  questionPdfUrl: string
  answerPdfUrl: string
}

type Exam = {
  examId: number
  university: string
  subject: string
  year: number
  questionNum: number
  questionPdfUrl: string
  answerPdfUrl: string
  videoUrl: string
}

const Exam = ({ university }: ExamProps) => {
  const examData: Exam[] = [
    {
      examId: 1,
      university: '京大',
      subject: 'micro',
      year: 2023,
      questionNum: 1,
      questionPdfUrl:
        'https://transfer-exams.s3.ap-northeast-1.amazonaws.com/kyoto/macro/question/%E4%BA%AC%E5%A4%A7h%EF%BC%93%EF%BC%91%E3%83%BB%E3%83%9E%E3%82%AF%E3%83%AD%EF%BC%92%E6%94%B9.pdf',
      answerPdfUrl:
        'https://transfer-exams.s3.ap-northeast-1.amazonaws.com/kyoto/macro/video/%E4%BA%AC%E5%A4%A7h%EF%BC%92%EF%BC%94%E3%83%BB%E3%83%9E%E3%82%AF%E3%83%AD%EF%BC%91%E6%94%B9%E3%83%BB%E8%A7%A3%E8%AA%AC.mp4',
      videoUrl: '',
    },
    {
      examId: 2,
      university: '京大',
      subject: 'micro',
      year: 2022,
      questionNum: 2,
      questionPdfUrl:
        'https://drive.google.com/file/d/1w8DHcX9qBbjQ6hXTFjX1p3cAEJwQq5p1/view?usp=share_link',
      answerPdfUrl:
        'https://d29xr5gslaixj1.cloudfront.net/kyoto/macro/video/%E4%BA%AC%E5%A4%A7h%EF%BC%92%EF%BC%94%E3%83%BB%E3%83%9E%E3%82%AF%E3%83%AD%EF%BC%91%E6%94%B9%E3%83%BB%E8%A7%A3%E8%AA%AC.mp4',
      videoUrl: '',
    },
    {
      examId: 3,
      university: '京大',
      subject: 'micro',
      year: 2021,
      questionNum: 1,
      questionPdfUrl:
        'https://drive.google.com/file/d/1w8DHcX9qBbjQ6hXTFjX1p3cAEJwQq5p1/view?usp=share_link',
      answerPdfUrl: '/pdfs/2023_answer_1.pdf',
      videoUrl: '',
    },
    {
      examId: 4,
      university: '京大',
      subject: 'micro',
      year: 2020,
      questionNum: 2,
      questionPdfUrl:
        'https://drive.google.com/file/d/1w8DHcX9qBbjQ6hXTFjX1p3cAEJwQq5p1/view?usp=share_link',
      answerPdfUrl: '/pdfs/2023_answer_1.pdf',
      videoUrl: '',
    },
    {
      examId: 5,
      university: '京大',
      subject: 'micro',
      year: 2019,
      questionNum: 1,
      questionPdfUrl:
        'https://drive.google.com/file/d/1w8DHcX9qBbjQ6hXTFjX1p3cAEJwQq5p1/view?usp=share_link',
      answerPdfUrl: '/pdfs/2023_answer_1.pdf',
      videoUrl: '',
    },
    {
      examId: 6,
      university: '京大',
      subject: 'micro',
      year: 2018,
      questionNum: 2,
      questionPdfUrl:
        'https://drive.google.com/file/d/1w8DHcX9qBbjQ6hXTFjX1p3cAEJwQq5p1/view?usp=share_link',
      answerPdfUrl: '/pdfs/2023_answer_1.pdf',
      videoUrl: '',
    },
  ]

  return (
    <div>
      <div className="flex justify-center text-blue-700">{university}</div>
      <div className="grid grid-cols-2 gap-4">
        {examData.map((exam) => (
          <div key={exam.year} className="bg-blue-100 p-2">
            <h2>{exam.year}年度</h2>
            <ul>
              <li key={exam.questionPdfUrl}>
                <div className="">
                  <a
                    href={exam.questionPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    問題 PDF
                  </a>
                </div>
                <div className="pb-1">
                  <a href={exam.answerPdfUrl} target="_blank" rel="noreferrer">
                    解答 PDF
                  </a>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Exam
