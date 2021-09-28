export default function buildLangCode(lang: string) {
  switch (lang) {
    case "zh-TW":
      return "zh"
    case "ch-CH":
      return "ch"
    default:
      return "en"
  }
}
