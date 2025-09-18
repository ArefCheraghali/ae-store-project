import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "@/components/Navbar";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/createEmotionCache";
import theme from "./theme";
import { Vazirmatn } from "next/font/google";

const clientSideEmotionCache = createEmotionCache();

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <main className={vazir.className}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </CacheProvider>
  );
}
