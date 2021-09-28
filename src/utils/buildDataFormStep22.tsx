import { IDataStep } from "@/interfaces"

interface idTypes {
  idTypes: [number] | any[]
}

export default function buildDataFormStep22(
  data: IDataStep,
  idTypes: idTypes["idTypes"]
) {
  if (idTypes.includes(0)) {
    let data0: any = {
      first_name: data.first_name,
      first_name_pinyin: data.first_name_pinyin,
      last_name: data.last_name,
      last_name_pinyin: data.last_name_pinyin,
      birth_country: data.birth_country,
      id_card: data.id_card,
    }

    if (data.mailAddress) {
      data0.mailAddress = { ...data.mailAddress }
    }
    return data0
  }
  if (idTypes.includes(1)) {
    let data1: any = {
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      date_of_birth: data.date_of_birth,
      birth_country: data.birth_country,
      gender: data.gender,
      ssn: data.ssn,
      visa_type: data.visa_type,
      visa_expiration_date: data.visa_expiration_date,
      residential_other_address: data.residential_other_address,
    }
    if (data.homeAddress) {
      data1.homeAddress = { ...data.homeAddress }
    }

    if (data.mailAddress) {
      data1.mailAddress = { ...data.mailAddress }
    }
    return data1
  }
  if (idTypes.includes(2) || idTypes.includes(3)) {
    let data23: any = {
      first_name: data.first_name,
      last_name: data.last_name,
      date_of_birth: data.date_of_birth,
      birth_country: data.birth_country,
      gender: data.gender,
      idType: data.idType,
      document_number: data.document_number,
      tax_id_number: data.tax_id_number,
      residential_other_address: data.residential_other_address,
    }
    if (data.homeAddress) {
      data23.homeAddress = { ...data.homeAddress }
    }

    if (data.mailAddress) {
      data23.mailAddress = { ...data.mailAddress }
    }

    return data23
  }
  if (idTypes.includes(4)) {
    let data4: any = {
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      date_of_birth: data.date_of_birth,
      birth_country: data.birth_country,
      gender: data.gender,
      idType: data.idType,
      document_number: data.document_number,
      tax_id_number: data.tax_id_number,
      residential_other_address: data.residential_other_address,
    }

    if (data.homeAddress) {
      data4.homeAddress = { ...data.homeAddress }
    }

    if (data.mailAddress) {
      data4.mailAddress = { ...data.mailAddress }
    }

    return data4
  }

  return {}
}
