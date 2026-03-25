export const urls = {
  // promotion
  promotion_get_all: '/promotion',
  promotion_create: '/promotion',
  promotion_update: '/promotion/:id',
  promotion_delete: '/promotion/:id',
  promotion_reorder: '/promotion/reorder',

  // home text
  home_text_get_all: '/home-text',
  home_text_update: '/home-text/:id',

  // category
  category_get_all: '/category',
  category_get_by_id: '/category/:id',
  category_create: '/category',
  category_update: '/category/:id',
  category_delete: '/category/:id',
  category_reorder: '/category/reorder',

  // characteristic
  characteristic_get_all: '/characteristic',
  characteristic_get_by_ids: '/characteristic/ids',
  characteristic_get_by_type: '/characteristic/type/:id',
  characteristic_create: '/characteristic',
  characteristic_update: '/characteristic/:id',
  characteristic_delete: '/characteristic/:id',

  // product
  product_get_all: '/product',
  product_get_top: '/product/top',
  product_get_by_category: '/product/category/:id',
  product_get_by_id: '/product/:id',
  product_create: '/product',
  product_update: '/product/:id',
  product_delete: '/product/:id',
  product_reorder: '/product/reorder',

  // auth
  auth_register: '/auth/register',
  auth_login: '/auth/login',
  auth_restore: '/auth/restore',
  auth_verify_password: '/auth/verify-password',
  auth_forgot_password: '/auth/forgot-password',
  auth_change_password: '/auth/change-password',
  auth_reset_password: '/auth/reset-password',
  auth_delete: '/auth/delete',

  // user
  user_modify_name: '/user/name',
  user_modify_phone: '/user/phone',
  user_modify_email: '/user/email',

  // address
  address_get_all: '/address',
  address_create: '/address',
  address_update: '/address/:id',
  address_delete: '/address/:id',

  // payment method
  payment_method_get_all: '/payment-method',
  payment_method_create: '/payment-method',
  payment_method_delete: '/payment-method/:id',

  // order
  order_get_all: '/order',
  order_create_intent: '/order/intent',
  order_confirm: '/order/confirm',
  order_invoice: '/order/:id/invoice',
  subscription_get_all: '/subscription',
  subscription_reactivate: '/subscription/reactivate',
  subscription_deactivate: '/subscription/deactivate',
  order_renewal: '/order/renewal',
}

/**
 * Create url to send a request to the backend or to use as backend api url
 *
 * @param urlKey The {@link urls} key to get the url
 * @param id Replace :id with the actual id in the frontend
 */
export default function (urlKey: keyof typeof urls, id?: number | string) {
  const url = `${import.meta.env.VITE_SERVER_URL}/v1${urls[urlKey]}`

  return id ? url.replace(':id', id.toString()) : url
}
