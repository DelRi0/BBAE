import styles from "../../welcome.module.scss"
import { useTranslations } from "next-intl"

const TextContent = () => {
  const t = useTranslations()
  const link = "https://www.sec.gov/investor/alerts/etfs.pdf"
  return (
    <div className={styles.textContent}>
      <div>{t("welcome_text_content_1")}</div>
      <div style={{ marginTop: 25 }}>{t("welcome_text_content_2")}</div>
      <div style={{ marginTop: 25 }}>{t("welcome_text_content_3")}</div>
      <div style={{ marginTop: 25 }}>
        {t("welcome_text_content_4")}
        <a target="_blank" href={link}>
          {t("welcome_text_content_4_1")}
        </a>
      </div>
      <div style={{ marginTop: 25 }}>{t("welcome_text_content_5")}</div>
      <div style={{ marginTop: 25 }}>{t("welcome_text_content_6")}</div>
      <div style={{ marginTop: 25 }}>
        {t("welcome_text_content_7")}
        <br />
        {t("welcome_text_content_8")}
        <br />
        {t("welcome_text_content_9")}{" "}
        <span style={{ color: "#49a5ff" }}>{t("welcome_text_content_10")}</span>
        <br />
        <br />
        {t("welcome_text_content_11")}
      </div>
    </div>
  )
}

export default TextContent
