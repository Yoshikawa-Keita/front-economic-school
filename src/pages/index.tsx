import { Inter } from 'next/font/google'
import Image from 'next/image'
import Header from '@/components/Header'
import Layout from '@/components/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  console.log('aaaaaaaaa', process.env.NEXT_PUBLIC_API_BASE_URL)
  return (
    <Layout>
      <div className="relative bg-[url('../../public/images/bgimage1.png')]">
        <div className="absolute inset-0 bg-[#000] opacity-50">aaa</div>
      </div>

      <div className="flex flex-row gap-4 bg-blue-400 justify-center">
        <div className="text-white text-2xl">economic school</div>
        <div className="text-white text-2xl">a</div>
      </div>
    </Layout>
  )
}
