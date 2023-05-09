import Layout from '@/components/Layout'
import { useAuthGuard } from '@/utils/hooks'

const video = () => {
  useAuthGuard()
  return (
    <Layout>
      <div className="width-auto">
        <h1 className="flex justify-center text-white bg-blue-300 text-4xl m-4">
          過去問演習動画
        </h1>
      </div>
    </Layout>
  )
}

export default video
