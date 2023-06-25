import Cookies from 'js-cookie'
import { ApiContext } from '@/types'
import { fetcher } from '@/utils'

export type SendPassWordResetEmailParam = {
  email: string
}

/**
 * パスワード再設定メール送信API
 * @param context APIコンテキスト
 * @param params パラメータ
 */
const sendPassWordResetEmail = async (
  context: ApiContext,
  params: SendPassWordResetEmailParam,
): Promise<void> => {
  await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/v1/send_password_reset_email`,
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
}

export default sendPassWordResetEmail
