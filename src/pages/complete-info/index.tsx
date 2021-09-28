import React, { useState, useEffect } from "react"
import StepsCustom from "@/components/StepsCustom"
import Step1TypeAccount from "@/components/Step1TypeAccount"
import Step2Component from "@/components/Step2Component"
import StepSubmitComponent from "@/components/StepSubmit"
import Step3Component from "@/components/Step3Component"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"
import { IDataStep } from "@/interfaces"
import cs from "classnames"
import moment from "moment"
import pushQueryString from "@/utils/pushQueryString"

const AppIndex = () => {
  const router = useRouter()
  const t = useTranslations()
  const [current, setCurrent] = useState(0)
  const [width, setWidth] = useState(0)
  const [rootData, setRootData] = useState({
    residential_other_address: false,
  })

  useEffect(() => {
    const { rootStep = 0 }: any = router.query
    setCurrent(parseInt(rootStep))
  }, [router])

  useEffect(() => {
    const { childrenStep = 1 }: any = router.query
    try {
      let dataProvider = JSON.parse(localStorage.getItem("data")) || {}
      if (dataProvider.date_of_birth) {
        dataProvider.date_of_birth = moment(dataProvider.date_of_birth)
      }
      if (dataProvider.visa_expiration_date) {
        dataProvider.visa_expiration_date = moment(
          dataProvider.visa_expiration_date
        )
      }
      const dataFileClosureUpload = localStorage.getItem("file_disclosure_upload");
      if(dataFileClosureUpload) {
        dataProvider.imageLetter = dataFileClosureUpload
      }else{
        dataProvider.imageLetter = null
      dataProvider.letterPath = null
      }
      

      setRootData({
        ...rootData,
        ...dataProvider,
        childrenStep: parseInt(childrenStep),
      })
    } catch (error) {
      throw error
    }
  }, [])

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  })

  const next = (dataComponent: IDataStep, isNext = true) => {
    let newData = { ...rootData, ...dataComponent }
    if (newData.idType > 0 && !newData.residential_other_address) {
      delete newData.mailAddress
    }

    if (newData.region !== "USA") {
      newData.step_2_1_agree = undefined
    }

    // save to localstorage để sau load lại vẫn còn data
    localStorage.setItem("data", JSON.stringify(newData))
    setRootData(newData)
    if (isNext) {
      setCurrent(current + 1)
      pushQueryString({
        router,
        dataChange: {
          rootStep: current + 1,
          childrenStep: 1, // luôn là page con đầu tiên của mỗi root Step chính
        },
      })
    } else {
      pushQueryString({
        router,
        dataChange: {
          childrenStep: newData.childrenStep,
        },
      })
    }
  }

  const prev = ({ childrenStep }) => {
    const step = current - 1
    setCurrent(step)
    if (childrenStep) {
      setRootData({ ...rootData, childrenStep: childrenStep })
    }
    pushQueryString({
      router,
      dataChange: {
        rootStep: step,
        childrenStep: childrenStep,
      },
    })
  }

  // console.log("rootData ==>", rootData)

  const steps = [
    {
      title: t("step_title_1"),
      content: (
        <Step1TypeAccount t={t} handleNextStep={next} rootData={rootData} />
      ),
    },
    {
      title: t("step_title_2"),
      content: (
        <Step2Component
          rootData={rootData}
          t={t}
          handleNextStep={next}
          handlePreviousStep={prev}
        />
      ),
    },
    {
      title: t("step_title_3"),
      content: (
        <Step3Component
          rootData={rootData}
          handleNextStep={next}
          handlePreviousStep={prev}
        />
      ),
    },
    {
      title: t("step_title_4"),
      content: <StepSubmitComponent rootData={rootData} backStep={prev} />,
    },
  ]
  return (
    <div className="root-step">
      {width > 768 ? (
        <div className={cs("divLogo")}>
          <div className={cs(width < 768 ? "logo-mobile" : "logo-pc")}></div>
        </div>
      ) : null}

      <StepsCustom steps={steps} current={current} />
    </div>
  )
}

export default AppIndex

export async function getServerSideProps(ctx) {
  if (!ctx.req.headers.cookie) {
    return {
      redirect: {
        destination: "/onboarding",
      },
    }
  }

  var myHeaders = new Headers()
  myHeaders.append("Cookie", ctx.req.headers.cookie)

  var requestOptions: any = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  // check contact info
  const response = await fetch(
    `${process.env.API_ENDPOINT}/account/contact/info`,
    requestOptions
  )
  const responseJson = await response.json()

  if (responseJson.Outcome === "JS00007") {
    return {
      redirect: {
        destination: "/onboarding",
      },
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
