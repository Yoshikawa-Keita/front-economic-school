import Cookies from 'js-cookie'
import React, { useContext } from 'react'
import useSWR from 'swr'
import signin from '@/services/auth/signin'
import signout from '@/services/auth/signout'
import type { ApiContext, User } from '@/types'

type AuthContextType = {
  authUser?: User
  signin: (username: string, password: string) => Promise<void>
  signout: () => Promise<void>
}

type AuthContextProviderProps = {
  context: ApiContext
  authUser?: User
}

const AuthContext = React.createContext<AuthContextType>({
  authUser: undefined,
  signin: async () => Promise.resolve(),
  signout: async () => Promise.resolve()
})

export const useAuthContext = (): AuthContextType =>
  useContext<AuthContextType>(AuthContext)

/**
 * 認証コンテキストプロバイダー
 * @param params パラメータ
 */
export const AuthContextProvider = ({
  context,
  authUser,
  children,
}: React.PropsWithChildren<AuthContextProviderProps>) => {
  
  const userData = Cookies.get('user') as string

  if (userData !== undefined) {
    authUser = JSON.parse(userData) as User
  }

  // サインイン
  const signinInternal = async (username: string, password: string) => {
    await signin(context, { username, password })
    
  }

  // サインアウト
  const signoutInternal = async () => {
    await signout(context)
   
  }

  return (
    <AuthContext.Provider
      value={{
        authUser: authUser,
        signin: signinInternal,
        signout: signoutInternal
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
