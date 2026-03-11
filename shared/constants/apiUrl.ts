export const urls = {
  // promotion
  promotion_get_all: '/promotion',
  promotion_create: '/promotion',
  promotion_update: '/promotion/:id',
  promotion_delete: '/promotion/:id',
}

/**
 * Create url to send a request to the backend or to use as backend api url
 *
 * @param urlKey The {@link urls} key to get the url
 * @param id Replace :id with the actual id in the frontend
 */
export default function (urlKey: keyof typeof urls, id?: number) {
  const url = `http://localhost:3000/api${urls[urlKey]}`

  return id ? url.replace(':id', id.toString()) : url
}
