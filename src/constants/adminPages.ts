export const adminPages = {
  pages: 'pages',
} as const
export type AdminPageKey = keyof typeof adminPages

export const adminSections = {
  promotion: 'promotion',
  category: 'category',
} as const
export type AdminSectionKey = keyof typeof adminSections
