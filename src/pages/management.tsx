import Layout from '@/components/Layout'
import { useAuthGuard } from '@/utils/hooks'

const management = () => {
  useAuthGuard()

  return (
    <Layout>
      <div className="width-auto">
        <h1 className="flex justify-center text-white bg-blue-300 text-4xl m-4">
          学習管理
        </h1>
      </div>
    </Layout>
  )
}

export default management
