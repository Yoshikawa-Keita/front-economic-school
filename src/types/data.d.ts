// 商品カテゴリ
export type Category = 'shoes' | 'clothes' | 'book'
// 商品の状態
export type Condition = 'new' | 'used'

// ユーザー
export type User = {
  username: string
  fullName: string
  email: string
  userType: number
  passwordChangedAt: Date
  createdAt:Date
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

// APIコンテキスト
export type ApiContext = {
  apiRootUrl: string
}
