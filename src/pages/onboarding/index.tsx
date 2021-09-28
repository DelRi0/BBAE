import { useRouter } from "next/router"
import ThanSo from "@/components/ThanSo"

const OnBoarding = () => {
  const router = useRouter()
  const next = (data) =>
    router.push({
      pathname: "/complete-info",
      query: { ...data, rootStep: 0, childrenStep: 1 },
    })

  return <ThanSo />
}

export async function getServerSideProps(ctx) {
  if (ctx.req.headers.cookie) {
    // check contact info
    var myHeaders = new Headers()
    myHeaders.append("Cookie", ctx.req.headers.cookie)

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }

    const response = await fetch(
      `${process.env.API_ENDPOINT}/account/contact/info`,
      requestOptions
    )
    const responseJson = await response.json()
    if (responseJson.Outcome === "Success") {
      return {
        redirect: {
          destination: "/complete-info",
        },
      }
    }
  }

  return {
    props: {
      messages: {
        ...require(`../../locales/${ctx.locale}.json`),
      },
      now: new Date().getTime(),
    },
  }
}

export default OnBoarding
