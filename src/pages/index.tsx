import styles from "@/components/welcome/welcome.module.scss"
import ThanSo from "@/components/ThanSo"
import _ from "lodash"

const WelcomePage = () => {
  return (
    <div className={styles.welcomePage}>
      <ThanSo></ThanSo>
    </div>
  )
}

export default WelcomePage

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../locales/${locale}.json`),
      },
      now: new Date().getTime(),
    },
  }
}
