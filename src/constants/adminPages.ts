export const adminPages = {
  home: 'home',
  category: 'category',
} as const
export type AdminPageKey = keyof typeof adminPages

export const adminSections = {
  promotion: 'promotion',
} as const
export type AdminSectionKey = keyof typeof adminSections
