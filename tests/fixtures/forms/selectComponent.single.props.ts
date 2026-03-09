import { Props, SelectField } from '@/types'
import z, { ZodType } from 'zod'

export default function (
  overrides = {},
): Props<{ field: SelectField; state: { test: number | undefined }; schema: ZodType<{ test: number }> }> {
  return {
    props: {
      field: {
        element: 'select',
        name: 'test',
        label: 'Test',
        items: [
          { value: 1, label: 'Test 1' },
          { value: 2, label: 'Test 2' },
        ],
        itemValueKey: 'value',
        itemLabelKey: 'label',

        multiple: false,
      },
      state: { test: undefined },
      schema: z.object({
        test: z.number('required'),
      }),
      ...overrides,
    },
  }
}
