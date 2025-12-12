import { Category, Characteristic } from '$/types'
import { SortOption } from '@/types'
import { defineStore } from 'pinia'

export const useSearchFilter = defineStore('searchFilter', {
  state: () => ({
    searchText: '' as string,
    selectedCategories: [] as Category[],
    selectedCharacteristics: [] as Characteristic[],
    selectedPriceRange: undefined as { lower: number; upper: number } | undefined,
    disponibleOnly: false as boolean,
    sortBy: 'default' as SortOption,
  }),

  actions: {
    setSelectedCategories(categories: Category[]) {
      this.selectedCategories = categories
    },

    setSelectedCharacteristics(characteristics: Characteristic[]) {
      this.selectedCharacteristics = characteristics
    },

    setSelectedPriceRange(priceRange: { lower: number; upper: number } | undefined) {
      this.selectedPriceRange = priceRange
    },

    setDisponibleOnly(disponbile: boolean) {
      this.disponibleOnly = disponbile
    },

    setSortBy(option: SortOption) {
      this.sortBy = option
    },
  },
})
