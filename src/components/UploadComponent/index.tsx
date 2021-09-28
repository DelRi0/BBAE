import React, { useState, useRef } from "react"
import styles from "./upload.module.scss"
import ImagePublic from "@/components/ImagePublic"
import { useTranslations } from "use-intl"
import { PlusCircleOutlined } from "@ant-design/icons"

interface IProps {
  text: string
  handleUpload: (file: File) => void
  iconImage?: string
  fileProps?: string
  width?: string
  height?: string
  isCanvas?: boolean
  imageWidth?: number | string
  imageHeight?: number | string
  idCanvas?: string
}

const UploadComponent: React.FC<IProps> = ({
  text,
  handleUpload,
  iconImage,
  fileProps,
  width,
  height,
  isCanvas = false,
  imageWidth = "100%",
  imageHeight = "100%",
  idCanvas = "canvasID",
}) => {
  const t = useTranslations()
  const [file, setFile] = useState(fileProps)

  const inputFile = useRef(null)
  const uploadClick = () => {
    if (inputFile && inputFile.current) {
      inputFile.current.click()
    }
  }

  const handleChangeFileUpload = (event) => {
    var file = event.target.files[0]
    if (file) {
      if (!/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.name)) {
        return alert(t("upload_require_image"))
      }
      setFile(file)
      handleUpload(file)
      inputFile.current.value = ""
    }
  }

  return (
    <div className={styles.UploadComponent} onClick={uploadClick}>
      {file ? (
        isCanvas ? (
          <div id={idCanvas} />
        ) : (
          <img
            width={imageWidth}
            height={imageHeight}
            src={typeof file === "string" ? file : URL.createObjectURL(file)}
            alt="bbae image"
          />
        )
      ) : (
        <React.Fragment>
          <div className={styles.iconPlus}>
            <ImagePublic
              src={iconImage ? iconImage : "add_picture.png"}
              alt=""
              width={width || "25"}
              height={height || "25"}
            />
          </div>
          <div className={styles.titleInforUpload}>{text}</div>
        </React.Fragment>
      )}
      <input
        type="file"
        accept="image/*"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={handleChangeFileUpload}
      />
    </div>
  )
}

export default UploadComponent
