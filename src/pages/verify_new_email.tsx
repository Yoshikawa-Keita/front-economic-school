import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import SuccessCheckmark from '@/components/SuccessCheckmark'
import verifyChangedMail from '@/services/email/verifyChangedMail'
import 'tailwindcss/tailwind.css'
import { ApiContext } from '@/types'

const VerifyNewEmail = () => {
  const router = useRouter()
  const [verificationStatus, setVerificationStatus] = useState('')

  useEffect(() => {
    const verifyChangedEmail = async () => {
      const username = router.query.username as string
      const email = router.query.email as string

      const context: ApiContext = {
        apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
      }

      try {
        await verifyChangedMail(context, {
          username,
          email,
        })
        setVerificationStatus('success')
        setTimeout(() => {
          router.push('/signin')
        }, 2000)
      } catch (error) {
        setVerificationStatus('failed')
      }
    }

    verifyChangedEmail()
  }, [router])

  return (
    <div className="flex justify-center items-center min-h-screen">
      {verificationStatus === 'success' && <SuccessCheckmark />}
      {verificationStatus === 'failed' && (
        <div className="text-red-500 text-lg font-semibold">
          認証に失敗しました。再度実行してください。
        </div>
      )}
    </div>
  )
}

export default VerifyNewEmail
