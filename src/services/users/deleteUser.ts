import type { ApiContext, User } from '@/types';
import { fetcher } from '@/utils';
import Cookies from 'js-cookie';

export type deleteUserParam = {
  username: string;
};

/**
 * ユーザー削除API
 * @param context APIコンテキスト
 * @param deleteUserParam パラメータ
 * @returns ユーザー
 */
const deleteUser = async (
  context: ApiContext,
  params: deleteUserParam,
): Promise<void> => {
  await fetcher(`${context.apiRootUrl.replace(/\/$/g, '')}/v1/delete_user`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('accessToken')}`,
    },
    body: JSON.stringify(params),
  });
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  Cookies.remove('user');
};

export default deleteUser;
