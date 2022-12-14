import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { PostContainer } from 'src/features/posts/components/PostContainer';

const Home: NextPage = () => {
  const router = useRouter();
  const signinState = useAppSelector((state) => state.auth.signin);

  useEffect(() => {
    if (router.isReady && !signinState.id) {
      router.push('/signin');
    }
  }, [router, signinState]);

  if (!signinState.id) {
    // 未ログインの時は、router.isReadyになるまでは画面に何も表示させないようにする
    // その後、ログインページにリダイレクトさせる（useEffect内のコードを参照）
    return <></>;
  }

  return (
    <div>
      <Head>
        <title>トップページ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>トップページ</h1>
      <PostContainer />
    </div>
  );
};

export default Home;
