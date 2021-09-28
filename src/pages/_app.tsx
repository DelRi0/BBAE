import { useEffect } from "react"
import "antd/dist/antd.css"
import "./styles.scss"
import { NextIntlProvider } from "next-intl"
import { useRouter } from "next/router"
import Head from "next/head"

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    localStorage.setItem("language", router.locale || "en-US")
  }, [router])

  return (
    <NextIntlProvider
      formats={{
        dateTime: {
          short: {
            day: "numeric",
            month: "short",
            year: "numeric",
          },
        },
      }}
      messages={pageProps.messages}
      now={new Date(pageProps.now)}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </NextIntlProvider>
  )
}
