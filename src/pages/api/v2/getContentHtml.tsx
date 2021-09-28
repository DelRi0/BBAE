export default async function handler(req, res) {
  const data = req.body
  const lang = req.headers["accept-language"]

  if (!data.protocolName) {
    return res.status(400).json({
      message: "protocolName is not null",
    })
  }

  const myHeaders = new Headers()
  myHeaders.append("Cookie", req.headers.cookie)
  myHeaders.append("Accept-Language", lang)

  const requestOptions: any = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  try {
    const dataResponse = await fetch(
      `${process.env.API_ENDPOINT}/protocol/detail?protocolName=${data.protocolName}`,
      requestOptions
    )
    const dataJson = await dataResponse.json()
    const response = await fetch(dataJson?.Data?.protocolUrl, requestOptions)
    const responseHtml = await response.text()
    res.status(200).json({ html: responseHtml, data: dataJson })
  } catch (error) {
    res.status(500).json(error?.message)
  }
}
