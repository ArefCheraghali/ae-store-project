import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  const [mode, setMode] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("themeMode") as "light" | "dark") || "light";
    }
    return "light";
  });

  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("lang") as Language) || "fa";
    }
    return "fa";
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.dir = lang === "fa" ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const next = prev === "light" ? "dark" : "light";
          localStorage.setItem("themeMode", next);
          return next;
        });
      },
    }),
    []
  );

  const language = useMemo(
    () => ({
      lang,
      toggleLanguage: () => {
        setLang((prev) => {
          const next = prev === "fa" ? "en" : "fa";
          localStorage.setItem("lang", next);
          return next;
        });
      },
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

  // Prevent flash: render nothing until mounted
  if (!mounted) {
    return null;
  }

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
            <Footer />
          </ThemeProvider>
        </LanguageContext.Provider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}
