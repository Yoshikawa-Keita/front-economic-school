import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import UserProfile from '@/components/UserProfile'
import updateUser from '@/services/users/updateUser'
import { User } from '@/types'
import { getUserFromCookie } from '@/utils/helper'

const Profile: NextPage = () => {
  const router = useRouter()
  const authUser = getUserFromCookie()

  const onUpdate = async (err?: Error) => {
    if (!err) {
      await router.push('/')
    }
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
        <UserProfile authUser={authUser} onUpdate={onUpdate}></UserProfile>
      </div>
    </Layout>
  )
}

export default Profile
