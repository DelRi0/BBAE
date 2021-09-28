const axios = require("axios")

export default async function handler(req, res) {
  var config = {
    method: "GET",
    url: `${process.env.API_ENDPOINT}/account/contact/info`,
    headers: {
      Cookie: req.headers.cookie,
    },
  }

  try {
    const response = await axios(config)
    res.status(200).json(response?.data)
  } catch (error) {
    res.status(500).json(error?.message)
  }
}
