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
 * Textarea Form Field
 */
export interface TextareaField extends FormFieldWrapper {
  element: 'textarea'
}

/**
 * Toggle Form Field
 */
export interface ToggleField extends FormFieldWrapper {
  element: 'toggle'
}

/**
 * Select Form Field
 */
export interface SelectField extends FormFieldWrapper {
  element: 'select'
  items: any[]
  itemValueKey: string
  itemLabelKey: string
}

/**
 * Form Field
 */
export type FormField = DividerField | ImageField | InputField | TextareaField | ToggleField | SelectField
