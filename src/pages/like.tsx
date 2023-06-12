import Layout from '@/components/Layout'
import { useAuthGuard } from '@/utils/hooks'

const Like = () => {
  useAuthGuard()
  return (
    <Layout>
      <div></div>
    </Layout>
  )
}

export default Like
