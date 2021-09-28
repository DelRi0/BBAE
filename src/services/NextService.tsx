import axios from "axios"
import buildLangCode from "@/utils/buildLangCode"

const instance = axios.create({
  baseURL: "/api/v2",
  timeout: 10000,
  withCredentials: true,
})
instance.interceptors.request.use(
  function (config) {
    config.headers = {
      "Accept-Language": buildLangCode(
        localStorage.getItem("language") || "en"
      ),
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

const NODE_ENV = process.env.NODE_ENV
class NextService {
  private axios = null

  constructor(axios) {
    if (!NODE_ENV || NODE_ENV !== "production") {
      this.axios = instance
    } else {
      this.axios = axios
    }
  }

  checkVisaType(params) {
    return this.axios.get("/account/checkIdCard", { params })
  }

  updateIdCard(dataBody) {
    return this.axios.post("/account/updateIdCard", dataBody)
  }

  sendNewCaptchaPhone(dataBody) {
    return this.axios.post("/security/mobileCaptcha", dataBody)
  }

  register(params) {
    return this.axios.post("/web/register2", params)
  }

  updateNewPhoneCaptcha(params) {
    return this.axios.post("/security/bindMobile", params)
  }

  sendPhoneCaptcha(params) {
    return this.axios.post("/security/register/sendMobileCaptcha", params)
  }

  sendEmailCaptcha(params) {
    return this.axios.post("/security/register/sendEmailCaptcha", params)
  }

  sendNewCaptchaEmail(params) {
    return this.axios.post("/update_email/sendNewCaptcha", params)
  }

  checkNewCaptchaEmail(params) {
    return this.axios.post("/update_email/checkNewCaptcha", params)
  }

  previewApplication(params) {
    return this.axios.post("/account/previewApplication", params)
  }

  confirmApplication() {
    return this.axios.post("/account/confirmApplication")
  }

  getContentHtml(params) {
    if (!NODE_ENV || NODE_ENV !== "production") {
      return this.axios.post("/getContentHtml", params)
    } else {
      return this.axios.post("/protocol/detail", params)
    }
  }

  protocolSinature(params) {
    return this.axios.post("/protocol/signature", params)
  }

  nonProfessionalInfo() {
    return this.axios.get("/protocol/h5/nonProfessionalInfo")
  }

  getInfor() {
    return this.axios.get("/account/contact/info")
  }
}

export default NextService
