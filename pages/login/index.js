'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/dashboard');
  };

  return (
    <div className="font-poppins bg-gradient-to-br from-[#0f172a] via-[#0b1120] to-black text-white min-h-screen flex items-center justify-center px-4">
      <Head>
        <title>Login | Mttrader Bot</title>
        <meta name="description" content="Login to Mttrader with Google" />
      </Head>

      <div className="bg-white/10 backdrop-blur-md p-10 sm:p-12 rounded-3xl shadow-2xl w-full max-w-md text-center transition-transform duration-300 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-cyan-400 mb-6 drop-shadow-md">
          Welcome to <span className="text-white">Mttrader</span>
        </h1>
        <p className="text-gray-300 mb-8">Your AI-powered crypto trading assistant</p>

        {!session ? (
          <>
            <button
              onClick={() => signIn('google')}
              className="flex items-center justify-center w-full py-3 px-6 rounded-full bg-white text-black font-semibold text-lg shadow-md hover:bg-gray-100 transition-all duration-200"
            >
              <FaGoogle className="mr-3 text-xl" />
              Sign in with Google
            </button>
            <p className="text-sm text-gray-400 mt-5">
              Secure authentication via your Google account.
            </p>
          </>
        ) : (
          <>
            <p className="text-lg text-cyan-300 font-medium mb-6 animate-fade-in">
              Welcome back, <span className="font-semibold">{session.user.name}</span>!
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleRedirect}
                className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-3 px-8 rounded-full transition-all"
              >
                Go to Dashboard
              </button>

              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition-all"
              >
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
