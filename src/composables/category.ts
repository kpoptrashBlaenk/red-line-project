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
        name: 'Technology',
        index: 0,
      },
      {
        id: 2,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: 'Health',
        index: 1,
      },
      {
        id: 3,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: 'Travel',
        index: 2,
      },
      {
        id: 4,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: 'Food',
        index: 3,
      },
      {
        id: 5,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: 'Education',
        index: 4,
      },
      {
        id: 6,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: 'Sports',
        index: 5,
      },
    ]

    return categories ?? []
  }

  // return all functions
  return { getCategories }
}
