import Cookies from 'js-cookie'
import { User } from '@/types'

export const getUserFromCookie = () => {
  const userData = Cookies.get('user') as string
  let authUser
  if (userData !== undefined) {
    authUser = JSON.parse(userData) as User
  }
  return authUser as User
}

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      // Remove the "data:" URL scheme part
      const base64Data = (reader.result as string).split(',')[1]
      resolve(base64Data)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
