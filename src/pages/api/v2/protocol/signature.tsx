const axios = require("axios")

export default async function handler(req, res) {
  var data = req.body
  const lang = req.headers["accept-language"]

  var config = {
    method: "POST",
    url: `${process.env.API_ENDPOINT}/protocol/signature/new`,
    headers: {
      Cookie: req.headers.cookie,
      "Accept-Language": `${lang}`,
    },
    data: data,
  }

  try {
    const response = await axios(config)
    res.status(200).json(response?.data)
  } catch (error) {
    res.status(500).json(error?.message)
  }
}
