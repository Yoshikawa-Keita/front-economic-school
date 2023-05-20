import { NextPage } from 'next'
import { useSpring, animated } from 'react-spring'
import Layout from '@/components/Layout'

const EmailVerificationPending: NextPage = () => {
  const fadeStyles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  })

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen">
        <animated.div style={fadeStyles} className="text-2xl text-blue-500">
          サインアップありがとうございます。
          <br />
          <br />
          確認メールを送信しました。メール内のリンクをクリックして認証を完了してください。
          <br />
          <br />
          メールが届かない場合は迷惑メールに振り分けされていないかご確認ください。
          <br />
          それでも解決しない場合は以下のTwitterのDMまでご連絡ください <br />
          Twitter: @lala_gaiji
        </animated.div>
      </div>
    </Layout>
  )
}

export default EmailVerificationPending
