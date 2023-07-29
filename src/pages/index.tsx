import { NextPage } from "next";
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import Divider from "@/components/Divider";
import { getUserFromCookie } from "@/utils/helper";

const Home: NextPage = () => {
  const authUser = getUserFromCookie();
  return (
    <Layout>
      <div className="flex justify-center items-center bg-blue-400 h-[150px] md:h-[200px]">
        <Image
          width={300}
          height={200}
          src="/images/topPageImage.png"
          alt="Economic School Logo"
        />
      </div>
      <section className="text-gray-700 body-font">
        <div className="container mx-auto flex px-5 py-4 items-center justify-center flex-col">
          <div className="text-center lg:w-2/3 w-full">
            <p className="mb-4 leading-relaxed text-lg sm:text-xl lg:text-2xl">
              経済編入の総合学習プラットフォーム
            </p>
          </div>
        </div>
      </section>
      <section className="text-gray-700 body-font bg-blue-50">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-blue-900">
              サービス一覧
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-blue-200 px-4 py-6 rounded-lg bg-white shadow-lg">
                <h2 className="title-font font-medium text-3xl text-blue-900">
                  過去問の閲覧
                </h2>
                <p className="leading-relaxed">
                  過去の編入試験問題とその解答例が閲覧可能
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-blue-200 px-4 py-6 rounded-lg bg-white shadow-lg">
                <h2 className="title-font font-medium text-3xl text-blue-900">
                  解説動画
                </h2>
                <p className="leading-relaxed">
                  詳細な解説動画で効率よく学習を進めることが可能
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-blue-200 px-4 py-6 rounded-lg bg-white shadow-lg">
                <h2 className="title-font font-medium text-3xl text-blue-900">
                  進捗管理
                </h2>
                <p className="leading-relaxed">
                  過去問演習の達成率が可視化されるため進捗管理が可能
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-blue-200 px-4 py-6 rounded-lg bg-white shadow-lg">
                <h2 className="title-font font-medium text-3xl text-blue-900">
                  ランキング
                </h2>
                <p className="leading-relaxed">
                  他のユーザーと進捗を競い合って高いモチベーションで学習が可能
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-700 body-font bg-blue-50 py-8">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="p-4 w-full">
              <div className="border-2 border-blue-200 px-4 py-6 rounded-lg bg-white shadow-lg text-center">
                <div className="relative h-60 w-full mb-4">
                  <Image
                    src="/images/examDataBase.png"
                    alt="Service Image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h2 className="title-font font-medium text-3xl text-blue-900">
                  高い網羅性
                </h2>
                {/* <p className="leading-relaxed">現時点での対応大学：神戸（経済）・神戸（経営）・横国・京大・名大・東北大・阪大・新潟</p> */}
              </div>
              <Divider />
              <div className="border-2 border-blue-200 px-4 py-6 rounded-lg bg-white shadow-lg text-center">
                <div className="relative h-60 w-full mb-4">
                  <Image
                    src="/images/examPicture2.png"
                    alt="Service Image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h2 className="title-font font-medium text-3xl text-blue-900">
                  シンプルで実用的なUI
                </h2>
              </div>
              <Divider />
              <div className="border-2 border-blue-200 px-4 py-6 rounded-lg bg-white shadow-lg text-center">
                <div className="relative h-96 w-full mb-4">
                  <Image
                    src="/images/management.png"
                    alt="Service Image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h2 className="title-font font-medium text-3xl text-blue-900">
                  進捗を視覚化
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-700 body-font bg-blue-100 py-24">
        <div className="container mx-auto px-5">
          <div className="lg:w-2/3 w-full mx-auto text-center">
            <p className="mb-8 leading-relaxed text-lg sm:text-xl lg:text-2xl">
              Economic Schoolは
              <a
                href="https://hennyu-online.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition duration-200"
              >
                オンライン編入学院
              </a>
              と提携しています。
            </p>
            <p className="mb-8 leading-relaxed text-lg sm:text-xl lg:text-2xl">
              オンライン編入学院のメンバーは無料で利用できます。
            </p>
            <p className="mb-8 leading-relaxed text-lg sm:text-xl lg:text-2xl">
              フリーユーザーでも一部機能が無料で利用できます。
            </p>
          </div>
        </div>
      </section>
      {!authUser && (
        <section className="text-gray-700 body-font">
          <div className="flex flex-col items-center mt-6 space-y-4">
            <Link href="/signup">
              <button className="inline-block py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                初めての方はこちらからサインアップ
              </button>
            </Link>
            <Link href="/signin">
              <button className="inline-block py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                既にアカウントをお持ちの方はこちらからサインイン
              </button>
            </Link>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Home;
