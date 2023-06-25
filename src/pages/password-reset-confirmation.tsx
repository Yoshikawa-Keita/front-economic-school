import { NextPage } from 'next'
import { useSpring, animated } from 'react-spring'
import Layout from '@/components/Layout'

const PasswordResetConfirmation: NextPage = () => {
  const fadeStyles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  })

  return (
    <Layout>
      <div className="flex justify-center items-start min-h-screen pt-20">
        <animated.div style={fadeStyles} className="text-2xl text-blue-500">
          パスワード再設定メールを送信しました。
          <br />
          <br />
          メール内のリンクをクリックして再設定を完了してください。
          <br />
          <br />
          メールが届かない場合は迷惑メールに振り分けされていないかご確認ください。
          <br />
        </animated.div>
      </div>
    </Layout>
  )
}

export default PasswordResetConfirmation
