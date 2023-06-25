import { ApiContext } from '@/types'
import { fetcher } from '@/utils'

export type PasswordResetMailMailParam = {
  /**
   * Email ID
   */
  emailId: number
  /**
   * Secret Code
   */
  secretCode: string
   /**
   * password
   */
  password: string
  
}

type PasswordResetMailResponse = {
  // レスポンスを更新します
  isVerified: boolean
}

/**
 * メール確認API
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns メールが確認されたかどうか
 */
const passwordResetMail = async (
  context: ApiContext,
  param: PasswordResetMailMailParam,
): Promise<PasswordResetMailResponse> => {
  const response: PasswordResetMailResponse = await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/v1/password_reset_email`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    },
  )
  return response
}

export default passwordResetMail
