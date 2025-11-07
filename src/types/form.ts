export interface FormFieldWrapper {
  label: string
  name: string
  error?: string
  touched?: boolean
}

export interface InputField extends FormFieldWrapper {
  element: 'ion-input'
}

export type FormField = InputField
