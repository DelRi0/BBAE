const rulePinyin = {
  required: true,
  validate: {
    // firstLetterUppercase: (v) => {
    //   const firstCharactor = v.charAt(0)
    //   return firstCharactor === firstCharactor.toUpperCase()
    // },
    onlyLatin: (v) => {
      return /^[A-Za-z ]+$/.test(v)
    },
  },
}

const ruleStreetAddressUS = {
  required: true,
  pattern: /^[a-zA-Z0-9-\s]+$/,
  validate: {
    maxLength_88: (v) => {
      return v.length <= 88
    },
  },
}

const ruleStreetAddressCommon = {
  required: true,
  validate: {
    maxLength_88: (v) => {
      return v.length <= 88
    },
    onlyLatin: (v) => {
      return /^[a-zA-Z0-9-,\s]+$/.test(v)
    },
  },
}

const ruleCity = {
  required: true,
  validate: {
    maxLength_50: (v) => {
      return v.length <= 50
    },
    onlyLatin: (v) => {
      return /^[a-zA-Z0-9-,\s]+$/.test(v)
    },
  },
}

const ruleState = {
  required: true,
  validate: {
    maxLength_50: (v) => {
      return v.length <= 50
    },
    onlyLatin: (v) => {
      return /^[a-zA-Z0-9-,\s]+$/.test(v)
    },
  },
}

const ruleZipCode = {
  required: true,
  validate: {
    maxLength_11: (v) => {
      return v.length <= 11
    },
    onlyLatinAndDigital: (v) => {
      return /^[a-zA-Z0-9-,\s]+$/.test(v)
    },
  },
}

const ruleFirstNameExceptCHN = {
  required: true,
  validate: {
    englishCharacters: (v) => {
      return /^[a-zA-Z\s]+$/.test(v)
    },
  },
}

export {
  rulePinyin,
  ruleStreetAddressUS,
  ruleStreetAddressCommon,
  ruleCity,
  ruleState,
  ruleZipCode,
  ruleFirstNameExceptCHN,
}
