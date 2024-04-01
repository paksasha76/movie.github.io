import Head from "next/head";
import type { AppProps } from "next/app";

import AuthContextProvider from "../providers/context/auth";
import AppContextProvider from "../providers/context/app";

import "./../global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Сайт с фильмами</title>
        <meta name="description" content="фильмы, приложение next.js" />
        <meta charSet="utf-8" />
      </Head>
      <AppContextProvider>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </AppContextProvider>
    </>
  );
}
