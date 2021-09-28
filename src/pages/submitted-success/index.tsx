import { useEffect, useState } from "react"
import styles from "./submitted.module.scss"
import _ from "lodash"
import { useTranslations } from "next-intl"
import ImagePublic from "@/components/ImagePublic"
import ButtonLinkToMobileApp from "@/components/ButtonLinkToMobileApp"
import cs from "classnames"
import Layout from "@/components/Layout"
import { nextService } from "@/services/index"
import { Spin, notification } from "antd"

const SubmittedSuccess = () => {
  const t = useTranslations()
  const [loading, setLoading] = useState(false)
  const urlAndroid =
    "https://play.google.com/store/apps/details?id=com.bbae.pro"
  const urlIOS =
    "https://apps.apple.com/us/app/bbae-pro-investing-your-way/id1571447341"

  useEffect(() => {
    setLoading(true)
    nextService
      .confirmApplication()
      .catch(() => {
        notification.error({
          message: t("call_api_have_error"),
        })
      })
      .finally(() => {
        setLoading(false)
        localStorage.clear()
      })
  }, [])

  return (
    <Spin spinning={loading} size="small">
      <Layout>
        <div className={styles.SubmittedSuccess}>
          <div className={cs(styles.bg, "welcome-bg-img")}>
            <div className={styles.textTitle}>
              {t("submitted_success_title")}
            </div>
          </div>
          <div className={styles.content}>
            <div>
              <div className={styles.wrapperContent1}>
                <div className={styles.wrapperText}>
                  <ImagePublic
                    width="102"
                    height="106"
                    src={"welcome/submitted_success.png"}
                    alt=""
                  />
                </div>
                <div className={styles.wrapperText}>
                  {t("submitted_success_content_1")}
                </div>
              </div>
              <div className={styles.wrapperContent2}>
                <ButtonLinkToMobileApp
                  text={`${t("download_android")}`}
                  type="android"
                  style={{ background: "#49A5FF" }}
                  textStyle={{ color: "#FFFFFF" }}
                  onClick={() => {
                    window.open(urlAndroid, "_blank").focus()
                  }}
                />
                <div style={{ marginLeft: 10 }}>
                  <ButtonLinkToMobileApp
                    text={`${t("download_ios")}`}
                    type="apple"
                    style={{ background: "#49A5FF" }}
                    textStyle={{ color: "#FFFFFF" }}
                    onClick={() => {
                      window.open(urlIOS, "_blank").focus()
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Spin>
  )
}

export default SubmittedSuccess

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../../locales/${locale}.json`),
      },
      now: new Date().getTime(),
    },
  }
}
