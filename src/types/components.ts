import type { PredefinedColors } from '@ionic/core/dist/types/interface'

type Position = 'start' | 'center' | 'end'
export type Color = PredefinedColors

/* Buttons */
export type Fill = 'solid' | 'outline' | 'clear'

export type ButtonProps = {
  label: string
  color: Color
  fill: Fill
  icon?: string
}

/* Cards */
export type CardProps = {
  color?: Color
  header?: CardHeader
  title?: CardTitle
  subtitle?: CardSubtitle
  content?: CardContent
  list?: CardList
  button?: ButtonProps
}

export type CardHeader = {
  color?: Color
}

export type CardTitle = {
  text?: string
  img?: string
  color?: Color
  background?: Color
  icon?: string
  position?: Position
}

export type CardSubtitle = {
  text: string
}

export type CardContent = {
  text: string
}

export type CardList = {
  items: string[]
}

export type CardButton = {
  items: string[]
}
