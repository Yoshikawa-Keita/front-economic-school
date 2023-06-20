/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['d29xr5gslaixj1.cloudfront.net', 's3.ap-northeast-1.amazonaws.com'],
  },
  compiler: (() => {
    let compilerConfig = {
      // styledComponentsの有効化
      styledComponents: true,
    }

    // if (process.env.NODE_ENV === 'production') {
    //   compilerConfig = {
    //     ...compilerConfig,
    //     // 本番環境ではReact Testing Libraryで使用するdata-testid属性を削除
    //     reactRemoveProperties: { properties: ['^data-testid$'] },
    //   }
    // }

    return compilerConfig
  })(),
  // async rewrites() {
  //   return [
  //     {
  //       // ex. /api/proxy
  //       source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:match*`,
  //       // ex. http://localhost:8080
  //       destination: `${process.env.API_BASE_URL}/:match*`,
  //     },
  //   ]
  // },
}

module.exports = nextConfig

const nextTranslate = require('next-translate-plugin')

module.exports = nextTranslate(nextConfig)
