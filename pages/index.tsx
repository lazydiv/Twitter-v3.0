import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import SideBar from '../components/SideBar'
import Widgets from '../components/Widgets'
import { fetchTweets } from '../utils/fetchTweets'
import { Tweet } from './../typing'
import { Toaster } from 'react-hot-toast'


interface Props {
  tweets: Tweet[]
}


const Home = ({ tweets }: Props) => {
  return (
    <>
      <div className="lg:max-w-6xl max-h-screen overflow-hidden mx-auto">
        <Head>
          <title>Twitter 3.0</title>
        </Head>
        <Toaster />
        <main className='grid grid-cols-9'>
          <SideBar />
          <Feed tweets={tweets}/>
          <Widgets />
        </main>
      </div>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();
  return {
    props: {
      tweets,
    }
  }
}