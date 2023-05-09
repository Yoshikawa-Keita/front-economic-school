import Exam from '@/components/Exam'
import Layout from '@/components/Layout'
import { useAuthGuard } from '@/utils/hooks'

const circle = () => {
  useAuthGuard()
  return (
    <Layout>
      <div className="width-auto">
        <h1 className="flex justify-center text-white bg-blue-300 text-4xl m-4">
          編入サークル
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-x-4 row-gap-8 m-4 p-4 justify-items-center items-center">
        <Exam university={'京大'} />
        <Exam university={'阪大'} />
        <Exam university={'名大'} />
        <Exam university={'東北大'} />
        <div className="col-span-4 border-b border-gray-300 w-full"></div>
        <Exam university={'横国'} />
        <Exam university={'神戸（経済）'} />
        <Exam university={'新潟'} />
      </div>
    </Layout>
  )
}

export default circle
