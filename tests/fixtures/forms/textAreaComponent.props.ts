import { Props, TextareaField } from '@/types'
import z from 'zod'

export default function (
  overrides = {},
): Props<{ field: TextareaField; state: { test: string | undefined }; schema: z.ZodType<{ test: string }> }> {
  return {
    props: {
      field: {
        element: 'textarea',
        name: 'test',
        label: 'Test',
      },
      state: { test: undefined },
      schema: z.object({
        test: z.string('required').min(1, 'required'),
      }),
      ...overrides,
    },
  }
}
