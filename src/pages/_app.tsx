// pages/_app.tsx
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Navbar from "@/components/Navbar";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/createEmotionCache";
import { Vazirmatn } from "next/font/google";
import { createContext, useMemo, useState } from "react";

const clientSideEmotionCache = createEmotionCache();

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

// Context to share toggle function
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        direction: "rtl",
        palette: { mode },
        typography: {
          fontFamily: "Vazirmatn, Tahoma, Arial, sans-serif",
        },
      }),
    [mode]
  );

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <main className={vazir.className}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}
