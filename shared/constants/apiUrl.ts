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
  product_post: 'product',
  product__reorder: 'product/reorder',
  product_put: 'product/:id',
  product_delete: 'product/:id',

  // product
  promotion_get: 'promotion',
  promotion_post: 'promotion',
  promotion__reorder: 'promotion/reorder',
  promotion_put: 'promotion/:id',
  promotion_delete: 'promotion/:id',
}

export default function (url: keyof typeof urls) {
  return `http://localhost:3000/api/${urls[url]}`
}
