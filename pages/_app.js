import Router from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
import { ChakraProvider } from "@chakra-ui/react";

import Layout from "../components/Layout";
import "../styles/globals.css";

// App
function MyApp({ Component, pageProps }) {
  // configure nprogress
  NProgress.configure({ showSpinner: false });

  // start progress on route start
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  // stop progress on route complete
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  return (
    <>
      {/* Head */}
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>

      {/* Layout */}
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
