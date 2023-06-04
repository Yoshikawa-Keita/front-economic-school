import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import signin from '@/services/auth/signin'
import signout from '@/services/auth/signout'
import type { ApiContext, User } from '@/types'

type AuthContextType = {
  authUser?: User
  isLoading: boolean
  signin: (username: string, password: string) => Promise<void>
  signout: () => Promise<void>
}

type AuthContextProviderProps = {
  context: ApiContext
  authUser?: User
}

const AuthContext = React.createContext<AuthContextType>({
  authUser: undefined,
  isLoading: false,
  signin: async () => Promise.resolve(),
  signout: async () => Promise.resolve(),
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
  
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = Cookies.get('user') as string;
    console.log("user fetching:", userData)
    if (userData !== undefined) {
      setUser(JSON.parse(userData) as User);
    } else {
      setUser(undefined);
    }
    setIsLoading(false);
  }, [Cookies.get('user')]); // クッキーの値が変わるたびに効果を実行する

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
        authUser: user,
        isLoading,
        signin: signinInternal,
        signout: signoutInternal,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
