import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { SigninForm } from 'src/features/auth/components/signin/SigninForm';

const SignupPage: NextPage = () => {
  const router = useRouter();
  const signinState = useAppSelector((state) => state.auth.signin);

  useEffect(() => {
    if (router.isReady && signinState.id) {
      router.push('/');
    }
  }, [router, signinState]);

  if (signinState.id) {
    // ログイン済みの時は、router.isReadyになるまでは画面に何も表示させないようにする
    // その後、トップページにリダイレクトさせる（useEffect内のコードを参照）
    return <></>;
  }

  return (
    <div>
      <Head>
        <title>ログイン</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SigninForm />
    </div>
  );
};

export default SignupPage;
