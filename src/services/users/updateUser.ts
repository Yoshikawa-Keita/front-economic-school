import Cookies from 'js-cookie';
import { ApiContext, User } from '@/types';
import { fetcher } from '@/utils';
import { convertFileToBase64 } from '@/utils/helper';

export type UpdateUserParams = {
  /**
   * ユーザー名
   */
  username: string;
  /**
   * フルネーム
   */
  fullName?: string;
  /**
   * メールアドレス
   */
  email?: string;

  /**
   * ユーザープロフィール
   */
  profileImage?: File | null;
};

type UpdateUserResponse = {
  user: User;
};

/**
 * ユーザー情報更新API
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns 更新されたユーザー
 */
const updateUser = async (
  context: ApiContext,
  params: UpdateUserParams,
): Promise<UpdateUserResponse> => {
  const payload: any = { ...params };

  // プロファイル画像がある場合、Base64形式に変換
  if (payload.profileImage) {
    payload.profileImage = await convertFileToBase64(payload.profileImage);
  }

  const response: UpdateUserResponse = await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/v1/update_user`,
    {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
      body: JSON.stringify(payload),
    },
  );

  Cookies.set('user', JSON.stringify(response.user));

  return response;
};

export default updateUser;
