import Cookies from 'js-cookie'

export const fetcher = async (
  resource: RequestInfo,
  init?: RequestInit,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  // const res = await fetch(resource, init)
  const res = await fetchWithToken(resource, init)

  if (!res.ok) {
    if (res.status === 503) {
      // 503はメンテナンスモードを表すために選択した例です
      // メンテナンスページへリダイレクト
      window.location.href = '/maintenance'
      return
    }
    // refresh the token if response status is 401 (Unauthorized)
    if (res.status === 401) {
      const refreshRes = await renewAccessToken()

      if (refreshRes.status === 200) {
        const tokenData = await refreshRes.json()

        // update the cookies with new tokens
        Cookies.set('accessToken', tokenData.access_token)
        // retry the API request with new access token
        fetchWithToken(resource, init)
        // redirect to the home page
        return (window.location.href = '/')
      }

      // refresh tokenが切れていたらサインイン画面に遷移させる
      return (window.location.href = '/signin')
    }
    const errorRes = await res.json()
    const error = new Error(
      errorRes.message ?? 'APIリクエスト中にエラーが発生しました',
    )

    throw error
  }

  return res.json()
}

// Fetch with the access token in the Authorization header
const fetchWithToken = (
  resource: RequestInfo,
  init: RequestInit = {},
): Promise<Response> => {
  const accessToken = Cookies.get('accessToken')
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    ...init.headers,
  }

  return fetch(resource, { ...init, headers })
}

type RenewAccessTokenRequest = {
  /**
   * refresh token
   */
  refresh_token: string
}

// Request new access and refresh tokens
const renewAccessToken = (): Promise<Response> => {
  const renewAccessTokenRequest: RenewAccessTokenRequest = {
    refresh_token: Cookies.get('refreshToken') as string,
  }

  return fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/v1/renew_access_token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(renewAccessTokenRequest),
    },
  )
}
