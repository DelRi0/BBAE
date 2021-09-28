const axios = require("axios")

export default async function handler(req, res) {
  const lang = req.headers["accept-language"]
  var config = {
    method: "GET",
    url: `${process.env.API_ENDPOINT}/protocol/h5/nonProfessionalInfo`,
    headers: {
      Cookie: req.headers.cookie,
      "Accept-Language": `${lang}`,
    },
  }

  try {
    const response = await axios(config)
    res.status(200).json(response?.data)
  } catch (error) {
    res.status(500).json(error?.message)
  }
}
