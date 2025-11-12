import type { PredefinedColors } from '@ionic/core/dist/types/interface'

/* Cards */
export type CardProps = {
  title?: CardTitle
  subtitle?: CardSubtitle
  content?: CardContent
  list?: CardList
}

export type CardTitle = {
  text: string
  color?: PredefinedColors
  icon?: string
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
