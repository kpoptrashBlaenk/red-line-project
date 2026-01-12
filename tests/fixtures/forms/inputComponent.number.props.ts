import { InputField, Props } from '@/types'
import z from 'zod'

export default function (
  overrides = {},
): Props<{ field: InputField; state: { test: number | undefined }; schema: z.ZodType<{ test: number }> }> {
  return {
    props: {
      field: {
        element: 'input',
        type: 'number',
        name: 'test',
        label: 'Test',
      },
      state: { test: undefined },
      schema: z.object({
        test: z.number('required'),
      }),
      ...overrides,
    },
  }
}
