import type { PredefinedColors } from '@ionic/core/dist/types/interface'

type Position = 'start' | 'center' | 'end'

/* Cards */
export type CardProps = {
  color?: PredefinedColors
  title?: CardTitle
  subtitle?: CardSubtitle
  content?: CardContent
  list?: CardList
}

export type CardTitle = {
  text: string
  color?: PredefinedColors
  background?: PredefinedColors
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
