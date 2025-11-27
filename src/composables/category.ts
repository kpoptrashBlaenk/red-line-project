import { Category } from '$/types'

/**
 * Use this composable to do category related queries
 */
export function useCategory() {
  /**
   * Get all categories
   */
  async function getCategories() {
    const categories: Category[] = [
      {
        id: 1,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: {
          en: 'Technology',
          fr: 'Technologie',
        },
        index: 0,
      },
      {
        id: 2,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: {
          en: 'Health',
          fr: 'Santé',
        },
        index: 1,
      },
      {
        id: 3,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: {
          en: 'Travel',
          fr: 'Voyage',
        },
        index: 2,
      },
      {
        id: 4,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: {
          en: 'Food',
          fr: 'Alimentation',
        },
        index: 3,
      },
      {
        id: 5,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: {
          en: 'Education',
          fr: 'Éducation',
        },
        index: 4,
      },
      {
        id: 6,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: {
          en: 'Sports',
          fr: 'Sports',
        },
        index: 5,
      },
    ]

    return categories ?? []
  }

  // return all functions
  return { getCategories }
}
