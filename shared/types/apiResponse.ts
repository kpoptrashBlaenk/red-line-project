/**
 * Product categories
 */
export type Category = {
  id: number
  image: string
  name: string
  index: number
}

/**
 * Promotional item for the Home Carousel
 */
export type Promotion = {
  id: number
  image: string // image url
  title: string
  subtitle: string
  button: string // button text
  link: string
  index: number
}

/**
 * Social links for the footer
 */
export type Social = {
  id: number
  logo: string
  link: string
}
