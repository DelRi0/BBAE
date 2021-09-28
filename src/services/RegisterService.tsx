class RegisterService {
  private axios

  constructor(axios) {
    this.axios = axios
  }

  getList() {
    return this.axios.get("/security/areaCode", {})
  }

  sendEmailCaptcha(params) {
    return this.axios.post("/security/register/sendEmailCaptcha", params)
  }

  sendPhoneCaptcha(params) {
    return this.axios.post("/security/register/sendMobileCaptcha", params)
  }

  register(params) {
    return this.axios.post("/web/register2", params)
  }

  sendNewCaptchaPhone(params) {
    return this.axios.post("/security/mobileCaptcha", params)
  }

  sendNewCaptchaEmail(params) {
    return this.axios.post("/us/update_email/sendNewCaptcha", params)
  }

  uploadBase64(params) {
    return this.axios.post("/file/uploadBase64", params)
  }

  updateNewPhoneCaptcha(params) {
    return this.axios.post("/security/bindMobile", params)
  }

  updateNewEmailCaptcha(params) {
    return this.axios.post("/us/update_email/checkNewCaptcha", params)
  }

  protocolSinature(params) {
    return this.axios.post("/protocol/signature/new", params)
  }

  previewApplication(params) {
    return this.axios.post("/account/previewApplication", params)
  }
}

export default RegisterService
