import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '@/components/Layout';

import getAllUsers from '@/services/users/get-all-users';
import getUser from '@/services/users/getUserByUsername';
import type { ApiContext } from '@/types';

type UserPageProps = {
  username: string;
};

const UserPage: NextPage<UserPageProps> = ({ username }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <Layout>{username}</Layout>;
};

//   export const getStaticPaths: GetStaticPaths = async () => {
//     const context: ApiContext = {
//       apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
//     }
//     const users = await getAllUsers(context)
//     const paths = users.map((u) => `/users/${u.id}`)

//     return { paths, fallback: true }
//   }

//   export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
//     const context: ApiContext = {
//       apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
//     }

//     if (!params) {
//       throw new Error('params is undefined')
//     }

//     // ユーザー情報と ユーザーの所持する商品を取得し、静的ページを作成
//     // 10秒でrevalidateな状態にし、静的ページを更新する
//     const userId = Number(params.id)
//     const [user, products] = await Promise.all([
//       getUser(context, { id: userId }),

//     ])

//     return {
//       props: {
//         id: userId,
//         user,
//         products: products ?? [],
//       },
//       revalidate: 10,
//     }
//   }

export default UserPage;
