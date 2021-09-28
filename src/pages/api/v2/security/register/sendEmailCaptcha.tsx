const axios = require("axios")

export default async function handler(req, res) {
  const data = req.body

  const config = {
    method: "POST",
    url: `${process.env.API_ENDPOINT}/security/register/sendEmailCaptcha`,
    data: data,
  }

  try {
    const response = await axios(config)
    const cookies = response["headers"]["set-cookie"]

    if (response?.data.Outcome === "Success") {
      res.setHeader("Set-Cookie", cookies)
    }
    return res.status(200).json(response?.data)
  } catch (error) {
    return res.status(500).json(error?.message)
  }
}
