import React from "react"
import styles from "../../welcome.module.scss"
import { useTranslations } from "next-intl"

const ContentItem = () => {
  const t = useTranslations()
  return (
    <div className={styles.ListItem}>
      {[1, 2, 3, 4].map((ele, index) => (
        <div key={index} className={styles.itemList}>
          <div>
            <div className={styles.circle} />
          </div>
          <div>
            <div className={styles.title}>
              {t(`welcome_list_item_${ele}_title`)}
            </div>
            <div className={styles.des}>
              {t(`welcome_list_item_${ele}_des`)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ContentItem
