import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'

export const useAuthGuard = (): void => {
  const router = useRouter()
  const { authUser, isLoading } = useAuthContext()
  const accessToken = Cookies.get('accessToken')

  useEffect(() => {
    // ユーザーが取得できない場合はサインインページにリダイレクト
    if (!authUser && !isLoading && !accessToken) {
      const currentPath = router.pathname

      router.push({
        pathname: '/signin',
        query: {
          redirect_to: currentPath,
        },
      })
    }
  }, [router, authUser, isLoading])
}
