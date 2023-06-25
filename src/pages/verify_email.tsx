import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import SuccessCheckmark from '@/components/SuccessCheckmark'
import verifyMail from '@/services/email/verifyMail'
import 'tailwindcss/tailwind.css'
import { ApiContext } from '@/types'

const VerifyEmail = () => {
  const router = useRouter()
  const [verificationStatus, setVerificationStatus] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      const secretCode = router.query.secret_code as string
      const emailId = Number(router.query.email_id)

      const context: ApiContext = {
        apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
      }

      try {
        await verifyMail(context, {
          emailId,
          secretCode,
        })
        setVerificationStatus('success')

        //await confirmEmailVerification(secretCode as string);
        setTimeout(() => {
          router.push('/signin')
        }, 2000)
      } catch (error) {
        setVerificationStatus('failed')
      }
    }

    verifyEmail()
  }, [router])

  return (
    <div className="flex justify-center items-center min-h-screen">
      {verificationStatus === 'success' && <SuccessCheckmark />}
      {verificationStatus === 'failed' && (
        <div className="text-red-500 text-lg font-semibold">
          認証に失敗しました。リンクが無効か期限切れです。
        </div>
      )}
    </div>
  )

}

export default VerifyEmail
