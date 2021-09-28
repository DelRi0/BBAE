const compressionImg = (file, option) => {
  return new Promise((resolve) => {
    if (file.size / 1024 / 1024 > option.size || 1) {
      let image = new Image()
      let reader = new FileReader() //Create a canvas
      let canvas = document.createElement("canvas") //Return an environment for drawing on the canvas
      canvas.width = 500

      let ctx = canvas.getContext("2d") //Read with file read object
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        let url = e.target.result //Read the contents of the file
        image.src = url //reader reads the file content is base64, use this url to preview the image before uploading
      }
      image.onload = () => {
        let w = option.width || image.naturalWidth
        let h = option.height || image.naturalHeight
        canvas.width = option.width
        canvas.height = option.height
        ctx.drawImage(image, 0, 0, w, h) // Draw the image onto the canvas where the size is the image size
        const value = canvas.toDataURL("image/jpeg", 0.3) // Convert the drawn canvans to the base64 url. This 0.3 is the ratio you want to compress. Don't be too small, it will be very blurry, and it won't be too big.
        const fBlob = convertBase64UrlToBlob(value) //Convert the base64 url ​​to a file format
        return resolve({
          base64: value,
          canvas,
          fileBlob: fBlob,
          isCompress: true,
        })
      }
    } else {
      return resolve({ isCompress: false, file })
    }
  })
}
// The following method is to convert the base64 format url into a blob object for easy uploading
const convertBase64UrlToBlob = (urlData) => {
  //Convert Base64 to Blob
  let bytes = window.atob(urlData.split(",")[1]) //Remove the url header and convert it to byte
  // Handle the exception, convert the ascii code less than 0 to greater than 0
  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], { type: "image/jpeg" })
}

export default compressionImg
