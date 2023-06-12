import Cookies from 'js-cookie'
import { ApiContext } from '@/types'
import { fetcher } from '@/utils'

export type GetSignedUrlRequest = {
  file_path: string
}

type GetSignedUrlResponse = {
  signed_url: string
}

/**
 * 署名付きURL取得API
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns 署名付きURL
 */
const getSignedURL = async (
  context: ApiContext,
  params: GetSignedUrlRequest,
): Promise<GetSignedUrlResponse> => {
  const response: GetSignedUrlResponse = await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/v1/signed-url`,
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

export default getSignedURL
