const urls = {
  // category
  category_get: 'category',
  category_find: 'category/:id',
  category_reorder: 'category/reorder',
  category_post: 'category',
  category_put: 'category/:id',
  category_delete: 'category/:id',

  // characteristic
  characteristic_get: 'characteristic',
  characteristic_post: 'characteristic',
  characteristic_put: 'characteristic/:id',
  characteristic_delete: 'characteristic/:id',

  // home text
  home_text_get: 'category',
  home_text_put: 'category/:id',

  // product
  product_get: 'product',
  product_top: 'product/top',
  product_category: 'product/category/:id',
  product_post: 'product',
  product_reorder: 'product/reorder',
  product_put: 'product/:id',
  product_delete: 'product/:id',

  // product
  promotion_get: 'promotion',
  promotion_post: 'promotion',
  promotion__reorder: 'promotion/reorder',
  promotion_put: 'promotion/:id',
  promotion_delete: 'promotion/:id',
}

/**
 * Create url to send a request to the backend or to use as backend api url
 *
 * @param urlKey The {@link urls} key to get the url
 * @param id Replace :id with the actual id in the frontend
 */
export default function (urlKey: keyof typeof urls, id?: number) {
  const url = `http://localhost:3000/api/${urls[urlKey]}`

  return id ? url.replace(':id', id.toString()) : url
}
