import styles from "../../welcome.module.scss"
import { useTranslations } from "next-intl"

const DownloadApp = () => {
  const t = useTranslations()
  const link1 = "https://www.finra.org/"
  const link2 = "https://www.sipc.org/"
  return (
    <div className={styles.DownloadApp}>
      <div className={styles.content_download}>
        {t("welcome_download_app_1")}{" "}
        <a target="_blank" href={link1} className={styles.text_highlight}>
          {t("welcome_download_app_2")}
        </a>{" "}
        {t("welcome_download_app_3")}{" "}
        <a target="_blank" href={link2} className={styles.text_highlight}>
          {t("welcome_download_app_4")}
        </a>
        <br />
        {t("welcome_download_app_5")}
      </div>
    </div>
  )
}

export default DownloadApp
