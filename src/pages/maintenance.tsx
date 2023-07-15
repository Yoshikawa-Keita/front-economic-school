import React from 'react'
import 'tailwindcss/tailwind.css'

const Maintenance: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-semibold mb-4">
          メンテナンス中です
        </h1>
        <p className="text-md md:text-xl">
          現在、システムメンテナンスを行っています。ご迷惑をおかけしますが、しばらくお待ちください。
          <br />
          24時 〜 7時の間は定時メンテナンスです。
        </p>
      </div>
    </div>
  )
}

export default Maintenance
