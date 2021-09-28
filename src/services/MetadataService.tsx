class MetadataService {
  private axios

  constructor(axios) {
    this.axios = axios
  }

  birthCountryList() {
    return this.axios.get("/account/birthCountryList")
  }

  visaType() {
    return this.axios.get("/config/visaType")
  }

  idDocs(params) {
    return this.axios.get("/account/idDocs", {
      params,
    })
  }

  getSurveyQuestion(params) {
    return this.axios.get("/account/getSurveyQuestion", {
      params,
    })
  }

  protocolDetail(params) {
    return this.axios.get("/protocol/detail", {
      params,
    })
  }
}

export default MetadataService
