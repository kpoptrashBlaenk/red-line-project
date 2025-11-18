import { ButtonProps, Props } from '@/types'
import { chevronForward } from 'ionicons/icons'

// default button for testing ButtonComponent
export const defaultButtonComponentProps: Props<ButtonProps> = {
  props: {
    label: 'Click Me',
    color: 'primary',
    fill: 'solid',
    icon: chevronForward,
  },
}
