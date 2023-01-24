import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { ThemeProvider } from "../components/themecontext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <link
          type="image/png"
          sizes="32x32"
          rel="icon"
          href="/cloud.png"
        ></link>
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
