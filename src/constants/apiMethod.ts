const apiMethods = {
  get: 'get',
  post: 'post',
  put: 'put',
  delete: 'delete',
} as const

export type ApiMethod = keyof typeof apiMethods

export default apiMethods
