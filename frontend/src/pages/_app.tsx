import type { AppProps } from "next/app";
import "../app/globals.css";
import NavBar from "../components/NavBar"; // Adjust the path according to your project structure

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
