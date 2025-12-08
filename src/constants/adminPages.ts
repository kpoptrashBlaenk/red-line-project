export const adminPages = {
  pages: 'pages',
} as const
export type AdminPageKey = keyof typeof adminPages

export const adminSections = {
  promotion: 'promotion',
  homeText: 'homeText',
  category: 'category',
  product: 'product',
  characteristic: 'characteristic',
} as const
export type AdminSectionKey = keyof typeof adminSections
