import styles from "../../welcome.module.scss"
import { useRouter } from "next/router"
import { useTranslations } from "next-intl"

const Box = () => {
  const t = useTranslations()
  const router = useRouter()

  return <div className={styles.box}></div>
}

export default Box

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../../../../locales/${locale}.json`),
      },
      now: new Date().getTime(),
    },
  }
}
