import { ApiContext } from '@/types'
import { fetcher } from '@/utils'
import Cookies from 'js-cookie'

export type VerifychangedMailParams = {
  /**
   * username
   */
  username: string
  /**
   * changed email
   */
  email: string
}

type VerifyNewMailResponse = {
  isVerified: boolean
}

/**
 * メールアドレス変更確認API
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns メールが認証されたかどうか
 */
const verifyChangedMail = async (
  context: ApiContext,
  params: VerifychangedMailParams,
): Promise<VerifyNewMailResponse> => {
  const response: VerifyNewMailResponse = await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/v1/verify_changed_email`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
      body: JSON.stringify(params),
    },
  )
  return response
}

export default verifyChangedMail
