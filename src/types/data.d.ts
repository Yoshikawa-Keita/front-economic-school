// 商品カテゴリ
export type Category = 'shoes' | 'clothes' | 'book'
// 商品の状態
export type Condition = 'new' | 'used'

// ユーザー
export type User = {
  username: string
  full_name: string
  email: string
  user_type: number
  profile_image_url: string
  is_email_verified: boolean
  password_changed_at: Date
  created_at: Date
  version: number
}

// 商品
export type Product = {
  id: number
  category: Category
  title: string
  description: string
  imageUrl: string
  blurDataUrl: string
  price: number
  condition: Condition
  owner: User
}

// 過去問
export type Exam = {
  examId: number
  university: string
  subject: string
  year: number
  question_num: number
  question_pdf_url: string
  answer_pdf_url: string
  video_url: string
  critique_url: string
}

// APIコンテキスト
export type ApiContext = {
  apiRootUrl: string
}
