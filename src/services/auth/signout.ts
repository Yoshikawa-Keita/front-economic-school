import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import type { ApiContext } from '@/types'
import { fetcher } from '@/utils'

/**
 * 認証API（サインアウト）
 * @param context APIコンテキスト
 * @returns サインアウトメッセージ
 */
const signout = (context: ApiContext): void => {
  Cookies.remove('user')
  Cookies.remove('accessToken')
  Cookies.remove('refresh_token')

  // return await fetcher(
  //   `${context.apiRootUrl.replace(/\/$/g, '')}/auth/signout`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // )
}

export default signout
