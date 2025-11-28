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
 * Divider Form Component
 */
export interface DividerField {
  label: string
  element: 'divider'
}

/**
 * Image Form Component
 */
export interface ImageField extends FormFieldWrapper {
  element: 'image'
}

/**
 * Input Form Field
 */
export interface InputField extends FormFieldWrapper {
  element: 'input'
}

/**
 * Form Field
 */
export type FormField = DividerField | ImageField | InputField
