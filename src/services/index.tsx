import axios from "axios"
import RegisterService from "./RegisterService"
import MetadataService from "./MetadataService"
import UploadService from "./UploadService"
import NextService from "./NextService"
import buildLangCode from "@/utils/buildLangCode"

const instance = axios.create({
  baseURL: process.env.API_ENDPOINT,
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
instance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

let registerService = new RegisterService(instance)
let uploadService = new UploadService(instance)
let metadataService = new MetadataService(instance)
let nextService = new NextService(instance)
export { metadataService, registerService, uploadService, nextService }
