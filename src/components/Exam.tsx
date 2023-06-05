import { Exam } from '@/types'
import React from 'react'

interface ExamProps {
  university: string
}

type ExamItem = {
  question_pdf_url: string
  answer_pdf_url: string
}

// type Exam = {
//   examId: number
//   university: string
//   subject: string
//   year: number
//   question_num: number
//   question_pdf_url: string
//   answer_pdf_url: string
//   video_url: string
// }

const Exam = ({ university }: ExamProps) => {
  const examData: Exam[] = [
    {
      examId: 1,
      university: '京大',
      subject: 'micro',
      year: 2023,
      question_num: 1,
      question_pdf_url:
        `${process.env.CLOUDFRONT_HOST}/kyoto/macro/question/kyoto_2010_1_mi_q.pdf`,
      answer_pdf_url:
        'https://transfer-exams.s3.ap-northeast-1.amazonaws.com/kyoto/macro/video/%E4%BA%AC%E5%A4%A7h%EF%BC%92%EF%BC%94%E3%83%BB%E3%83%9E%E3%82%AF%E3%83%AD%EF%BC%91%E6%94%B9%E3%83%BB%E8%A7%A3%E8%AA%AC.mp4',
      video_url: '',
      critique_url: '',
    },
    {
      examId: 2,
      university: '京大',
      subject: 'micro',
      year: 2022,
      question_num: 2,
      question_pdf_url:
        'https://drive.google.com/file/d/1w8DHcX9qBbjQ6hXTFjX1p3cAEJwQq5p1/view?usp=share_link',
      answer_pdf_url:
        'https://d29xr5gslaixj1.cloudfront.net/kyoto/macro/video/%E4%BA%AC%E5%A4%A7h%EF%BC%92%EF%BC%94%E3%83%BB%E3%83%9E%E3%82%AF%E3%83%AD%EF%BC%91%E6%94%B9%E3%83%BB%E8%A7%A3%E8%AA%AC.mp4',
      video_url: '',
      critique_url: '',
    },
    {
      examId: 3,
      university: '京大',
      subject: 'micro',
      year: 2021,
      question_num: 1,
      question_pdf_url:
        'https://drive.google.com/file/d/1w8DHcX9qBbjQ6hXTFjX1p3cAEJwQq5p1/view?usp=share_link',
      answer_pdf_url: '/pdfs/2023_answer_1.pdf',
      video_url: '',
      critique_url: '',
    },
    {
      examId: 4,
      university: '京大',
      subject: 'micro',
      year: 2020,
      question_num: 2,
      question_pdf_url:
        'https://drive.google.com/file/d/1w8DHcX9qBbjQ6hXTFjX1p3cAEJwQq5p1/view?usp=share_link',
      answer_pdf_url: '/pdfs/2023_answer_1.pdf',
      video_url: '',
      critique_url: '',
    },
    {
      examId: 5,
      university: '京大',
      subject: 'micro',
      year: 2019,
      question_num: 1,
      question_pdf_url:
        'https://drive.google.com/file/d/1w8DHcX9qBbjQ6hXTFjX1p3cAEJwQq5p1/view?usp=share_link',
      answer_pdf_url: '/pdfs/2023_answer_1.pdf',
      video_url: '',
      critique_url: '',
    },
    {
      examId: 6,
      university: '京大',
      subject: 'micro',
      year: 2018,
      question_num: 2,
      question_pdf_url:
        'https://drive.google.com/file/d/1w8DHcX9qBbjQ6hXTFjX1p3cAEJwQq5p1/view?usp=share_link',
      answer_pdf_url: '/pdfs/2023_answer_1.pdf',
      video_url: '',
      critique_url: '',
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
              <li key={exam.question_pdf_url}>
                <div className="">
                  <a
                    href={exam.question_pdf_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    問題 PDF
                  </a>
                </div>
                <div className="pb-1">
                  <a href={exam.answer_pdf_url} target="_blank" rel="noreferrer">
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
