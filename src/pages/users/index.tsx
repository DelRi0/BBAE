import React from "react"
import { Button } from "antd"
import ImagePublic from "src/components/ImagePublic"
import styles from "./user.module.scss"
import { useRouter } from "next/router"

const UserPage = () => {
  const router = useRouter()
  const next = () =>
    router.push({
      pathname: "/",
      query: { email: "dinasdas@gmail.com", phone: "123123131212312" },
    })

  return (
    <div className={styles.users}>
      <h1>users page</h1>
      <div>{process.env.API_ENPOINT}</div>
      <Button type="primary" onClick={next}>
        Primary Button Antd
      </Button>
      <ImagePublic src="test.jpeg" alt="Picture of the author" />
    </div>
  )
}

export default UserPage
