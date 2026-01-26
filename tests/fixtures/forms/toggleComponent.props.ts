import { Props, ToggleField } from '@/types'
import z, { ZodType } from 'zod'

export default function (
  overrides = {},
): Props<{ field: ToggleField; state: { test: boolean }; schema: ZodType<{ test: boolean }> }> {
  return {
    props: {
      field: {
        element: 'toggle',
        name: 'test',
        label: 'Test',
      },
      state: { test: false },
      schema: z.object({
        test: z.boolean('required'),
      }),
      ...overrides,
    },
  }
}
