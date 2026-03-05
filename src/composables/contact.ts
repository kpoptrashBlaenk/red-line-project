import { FormField } from '@/types'
import { ContactSchema } from '@/utils/schemas'
import translation from '@/utils/translation'

/**
 * Use this composable to do contact related queries
 */
export function useContact() {
  /**
   * Create form fields for contact
   */
  function createFields() {
    return [
      {
        element: 'input',
        name: 'subject',
        label: translation('subject'),
      },
      {
        element: 'textarea',
        name: 'text',
        label: translation('message'),
      },
    ] as FormField[]
  }

  /**
   * Send the contact form
   */
  async function send(data: ContactSchema) {
    data
  }

  return { createFields, send }
}
