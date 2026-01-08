import { ImageField, Props } from '@/types'
import z from 'zod'

export default function (
  overrides = {},
): Props<{ field: ImageField; state: { test: string[] | [] }; schema: z.ZodType<{ test: string[] }> }> {
  return {
    props: {
      field: {
        element: 'image',
        name: 'test',
        label: 'Test',
        multiple: true,
      },
      state: { test: [] },
      schema: z.object({
        test: z.array(z.url()).min(1, 'required'),
      }),
      ...overrides,
    },
  }
}
