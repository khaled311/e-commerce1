import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "components";
import { StateContext } from "context/stateContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}
