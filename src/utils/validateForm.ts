import { FormField } from '@/types'
import { ZodType } from 'zod'

/**
 * Validate a form.
 *
 * This function loops through all fields, validates the form state using
 * the Zod schema, sets each field's `error` and `touched` flags,
 * and returns whether the form is valid.
 *
 * @param fields - The form fields to validate.
 * @param  state - The reactive state object holding form values.
 * @param  schema - The Zod schema to validate against.
 * @returns  True if the form is valid; false if there are validation errors.
 */
export async function validateForm(fields: FormField[], state: Record<string, any>, schema: ZodType<any>) {
  const result = await schema.safeParseAsync(state)

  let valid = true

  fields.forEach((field) => {
    if (field.element === 'divider') return

    if (!result.success) {
      const issue = result.error.issues.find((issue: any) => issue.path[0] === field.name)

      field.error = issue ? issue.message : ''

      if (issue) valid = false

      field.touched = true
    }
  })

  return valid
}
