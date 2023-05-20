import { ApiContext } from "@/types"
import { fetcher } from "@/utils"

export type VerifyMailParams = {
    /**
     * Email ID
     */
    emailId: number
    /**
     * Secret Code
     */
    secretCode: string
  }
  
  type VerifyMailResponse = {
    // レスポンスを更新します
    isVerified: boolean
  }
  
  /**
   * メール確認API
   * @param context APIコンテキスト
   * @param params パラメータ
   * @returns メールが確認されたかどうか
   */
  const verifyMail = async (
    context: ApiContext,
    params: VerifyMailParams,
  ): Promise<VerifyMailResponse> => {
    const response: VerifyMailResponse = await fetcher(
      `${context.apiRootUrl.replace(/\/$/g, '')}/v1/verify_email`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${Cookies.get('accessToken')}` // if necessary
        },
        body: JSON.stringify(params),
      },
    )
    return response
  }
  
  export default verifyMail
  