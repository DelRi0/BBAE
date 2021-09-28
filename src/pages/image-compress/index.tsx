import React, { useState } from "react"
import compressionImg from "@/utils/imageCompress"

export default function index() {
  const [file, setFile] = useState(null)
  const [fileAfter, setFileAfter] = useState(null)

  const handleUpload = () => {
    compressionImg(file, {
      width: 364,
      height: 200,
    }).then((response) => {
      setFileAfter(response)
    })
  }

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>ok</button>
      {fileAfter && (
        <img
          width="100%"
          height="100%"
          id="blah"
          src={URL.createObjectURL(fileAfter)}
          alt="your image"
        />
      )}
    </div>
  )
}
