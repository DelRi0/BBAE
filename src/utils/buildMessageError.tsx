function buildFieldName(fieldName) {
  switch (fieldName) {
    case "country":
      return "Country"
    case "region":
      return "Region"
    case "first_name":
      return "First name"
    case "last_name":
      return "Last name"
    case "date_of_birth":
      return "Date of birth"
    case "birth_country":
      return "Birth country"
    case "gender":
      return "Gender"
    case "idType":
      return "Document type"
    case "document_number":
      return "Document number"
    case "tax_id_number":
      return "Tax id number"
    case "visa_type":
      return "Visa type"
    case "visa_expiration_date":
      return "Visa expiration date"
    case "ssn":
      return "SSN"
    case "first_name_pinyin":
      return "First name pinyin"
    case "last_name_pinyin":
      return "Last name pinyin"
    case "id_card":
      return "ID card"
    case "homeAddress.address":
      return "Residential address"
    case "homeAddress.city":
      return "Residential city"
    case "homeAddress.postCode":
      return "Residential zip code"
    case "homeAddress.state":
      return "Residential state"
    case "mailAddress.address":
      return "Mailing address"
    case "mailAddress.city":
      return "Mailing city"
    case "mailAddress.postCode":
      return "Mailing zip code"
    case "mailAddress.state":
      return "Mailing state"
    case "InvestmentProfileInit":
      return "All fields"
    case "surveyInit":
      return "All fields"
    default:
      throw new Error(`${fieldName} is not defined`)
  }
}

export default function buildMessageError({ type, fieldName }) {
  const fieldNameShow = buildFieldName(fieldName)
  switch (type) {
    case "required":
      return `${fieldNameShow} is required`
    case "pattern":
    case "firstLetterUppercase":
      return `${fieldNameShow} is incorrect`
    // case "firstLetterUppercase":
    //   return `The first character of [${fieldNameShow}] must be letter uppercase`
    case "englishCharacters":
      return `${fieldNameShow} must be in English characters`
    case "onlyLatin":
      return `${fieldNameShow} must be in Latin characters`
    case "onlyLatinAndDigital":
      return `${fieldNameShow} must be in Latin or Digit characters`
    default:
      if (/^maxLength_([0-9])+$/.test(type)) {
        const number = type.split("_")[1]
        return `${fieldNameShow} no more than ${number} characters`
      }
      throw new Error(`${type} is not defined`)
  }
}
