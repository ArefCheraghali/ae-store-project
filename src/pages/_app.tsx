import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Navbar from "@/components/Navbar";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/createEmotionCache";
import { Vazirmatn } from "next/font/google";
import { createContext, useMemo, useState, useEffect } from "react";

const translations = {
  fa: {
    home: "صفحه اصلی",
    categories: "دسته‌بندی‌ها",
    contact: "تماس با ما",
    stores: "فروشگاه‌ها",
  },
  en: {
    home: "Home",
    categories: "Categories",
    contact: "Contact Us",
    stores: "Stores",
  },
} as const;

type Language = keyof typeof translations;
type TranslationKey = keyof (typeof translations)["fa"];

const clientSideEmotionCache = createEmotionCache();

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
export const LanguageContext = createContext<{
  lang: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}>({
  lang: "fa",
  toggleLanguage: () => {},
  t: () => "",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState<Language>("fa");

  useEffect(() => {
    document.dir = lang === "fa" ? "rtl" : "ltr";
  }, [lang]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const language = useMemo(
    () => ({
      lang,
      toggleLanguage: () => setLang((prev) => (prev === "fa" ? "en" : "fa")),
      t: (key: TranslationKey) => translations[lang][key],
    }),
    [lang]
  );

  const theme = useMemo(
    () =>
      createTheme({
        direction: lang === "fa" ? "rtl" : "ltr",
        palette: { mode },
        typography: {
          fontFamily: "Vazirmatn, Tahoma, Arial, sans-serif",
        },
      }),
    [mode, lang]
  );

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ColorModeContext.Provider value={colorMode}>
        <LanguageContext.Provider value={language}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <main className={vazir.className}>
              <Component {...pageProps} />
            </main>
          </ThemeProvider>
        </LanguageContext.Provider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}
