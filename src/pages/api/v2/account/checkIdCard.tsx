const axios = require("axios")

export default async function handler(req, res) {
  const { idNumber, idDoc } = req.query

  const lang = req.headers["accept-language"]

  if (!idNumber) {
    return res.status(400).json({
      message: "idNumber is not null",
    })
  }

  if (!idDoc) {
    return res.status(400).json({
      message: "idDoc is not null",
    })
  }

  const config = {
    method: "GET",
    url: `${
      process.env.API_ENDPOINT
    }/account/checkIdCard?idNumber=${idNumber}&id%20doc%20type%20Id=${parseInt(
      idDoc
    )}`,
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
