/**
 * Form Field Wrapper
 */
export interface FormFieldWrapper {
  label: string
  name: string
  error?: string
  touched?: boolean
}

/**
 * Input Form Field
 */
export interface InputField extends FormFieldWrapper {
  element: 'ion-input'
}

/**
 * Form Field
 */
export type FormField = InputField
