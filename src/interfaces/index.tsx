export interface IDataStep {
  region?: string
  country?: string
  idType?: number
  surveyInit?: [options: []]
  survey?: []
  step3_4_yes_or_no?: boolean
  InvestmentProfile?: []
  InvestmentProfileInit?: [options: []]
  last_name?: string
  first_name?: string
  middle_name?: string
  id_card?: string
  homeAddress?: object
  mailAddress?: object
  date_of_birth?: string
  first_name_pinyin?: string
  last_name_pinyin?: string
  gender?: string
  step_2_1_agree?: boolean
  visa_type?: string
  visa_expiration_date?: string
  birth_country?: string
  email?: string
  letterPath?: string
  mobile?: string
  country_name?: string
  birth_country_name?: string
  ssn?: string
  dataSurvey1?: [options: []]
  residential_other_address?: boolean
  isEmployed?: boolean
  tax_id_number?: string
  document_number?: string
  account_type: number
  childrenStep: number
}

export interface IPropsStepChildren {
  data: IDataStep
  updateDataStore?: (newData: IDataStep | {}, isNext?: boolean) => void
  backStep: (step: number) => void
}

export interface INonProfessional {
  dataNonProfessional?: string
}

export interface IDataApplicationAgreement {
  dataApplicationAgreement?: string
}

export interface IPropsStepChildrenNonProfessional extends INonProfessional {
  data: IDataStep
  updateDataStore?: ({}) => void
  backStep: (step: number) => void
}

export interface IPropsStepChildrenDataApplicationAgreement
  extends IDataApplicationAgreement {
  data: IDataStep
  updateDataStore?: ({}) => void
  backStep: (step: number) => void
}
