class UploadService {
  private axios

  constructor(axios) {
    this.axios = axios
  }

  upload(dataReq) {
    return this.axios.post("/file/uploadBase64", dataReq)
  }
}

export default UploadService
