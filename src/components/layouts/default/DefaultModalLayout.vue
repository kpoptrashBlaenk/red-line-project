<template>
  <IonModal :is-open :initial-breakpoint="0.75" :breakpoints="[0, 0.75, 1]" @will-dismiss="$emit('close:search-modal')">
    <IonContent color="light">
      <!-- Searchbar -->
      <IonSearchbar v-model="searchFilterStore.searchText" :placeholder="translation('search_product')" />

      <!-- Filters -->
      <div class="px-2 flex md:grid md:grid-cols-5 overflow-x-auto gap-2 scrollbar-none" :class="{ 'flex-wrap': isDesktop() }">
        <DefaultSearchFilter
          context="category"
          color="primary"
          :label="translation('categories')"
          chip-key="name"
          :items="categories"
          :default="searchFilterStore.selectedCategories"
          :on-update="searchFilterStore.setSelectedCategories"
        />

        <DefaultSearchFilter
          context="characteristic"
          color="secondary"
          :label="translation('characteristics')"
          chip-key="name"
          :items="characteristics"
          :default="searchFilterStore.selectedCharacteristics"
          :on-update="searchFilterStore.setSelectedCharacteristics"
        />

        <DefaultRangeFilter
          context="price"
          color="tertiary"
          :label="translation('price')"
          :min="[...products].sort((a, b) => a.price - b.price)[0].price"
          :max="[...products].sort((a, b) => b.price - a.price)[0].price"
          :default="searchFilterStore.selectedPriceRange"
          :on-update="searchFilterStore.setSelectedPriceRange"
        />

        <ToggleButton
          color="primary"
          :on-label="translation('disponible_only')"
          :off-label="translation('all_services')"
          :default="searchFilterStore.disponibleOnly"
          :on-update="searchFilterStore.setDisponibleOnly"
        />

        <DefaultSortByFilter
          context="sort"
          color="secondary"
          :label="translation('sort')"
          :items="[
            { value: 'default', label: translation('default') },
            { value: 'priceLH', label: translation('priceLH') },
            { value: 'priceHL', label: translation('priceHL') },
            { value: 'new', label: translation('new') },
            { value: 'old', label: translation('old') },
            { value: 'disponible', label: translation('disponible') },
          ]"
          :default="searchFilterStore.sortBy"
          :on-update="(item) => searchFilterStore.setSortBy(item)"
        />
      </div>

      <!-- Filter Chips -->
      <div id="chips-row" class="flex gap-1 px-2 mt-2 overflow-x-auto scrollbar-none" :class="{ 'flex-wrap': isDesktop() }"></div>

      <!-- List -->
      <IonList class="bg-light">
        <!-- Item -->
        <SearchProductItem :products :categories :characteristics />
      </IonList>
    </IonContent>
  </IonModal>
</template>

<script setup lang="ts">
/* Imports */
import { Category, Characteristic, Product } from '$/types'
import ToggleButton from '@/components/ui/buttons/ToggleButton.vue'
import SearchProductItem from '@/components/ui/items/SearchProductItem.vue'
import { useCategory } from '@/composables/category'
import { useCharacteristic } from '@/composables/characteristic'
import { useProduct } from '@/composables/product'
import { useSearchFilter } from '@/stores/searchFilter'
import isDesktop from '@/utils/isDesktop'
import translation from '@/utils/translation'
import { IonContent, IonList, IonModal, IonSearchbar } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import DefaultRangeFilter from './DefaultRangeFilter.vue'
import DefaultSearchFilter from './DefaultSearchFilter.vue'
import DefaultSortByFilter from './DefaultSortByFilter.vue'
/* Props */
defineProps<{
  isOpen: boolean
}>()

/* Constants */
const productComposable = useProduct()
const categoryComposable = useCategory()
const characteristicComposable = useCharacteristic()
const searchFilterStore = useSearchFilter()

/* Refs */
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const characteristics = ref<Characteristic[]>([])

/* Lifecycle Hooks */
onMounted(async () => {
  products.value = await productComposable.get()
  categories.value = await categoryComposable.get()
  characteristics.value = await characteristicComposable.get()
})
</script>

<style lang="css" scoped>
ion-modal {
  --width: 100%;
}
</style>
