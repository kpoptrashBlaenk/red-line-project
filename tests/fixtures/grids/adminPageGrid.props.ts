import { AdminPageKey } from '@/constants/adminPages'
import { Props } from '@/types'

export default function (overrides = {}): Props<{ selectedPage: AdminPageKey }> {
  return {
    props: {
      selectedPage: 'pages',
      ...overrides,
    },
  }
}
