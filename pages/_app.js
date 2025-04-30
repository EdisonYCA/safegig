import "@/styles/globals.css";
import { StateContext } from "@/context/StateContext";
import { ThirdwebProvider } from "thirdweb/react";

export default function App({ Component, pageProps }) {

  return (
    <ThirdwebProvider>
      <StateContext>
        <Component {...pageProps} />
      </StateContext>
    </ThirdwebProvider>
  );
}
