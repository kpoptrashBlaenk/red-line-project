<template>
  <IonModal :is-open :initial-breakpoint="0.75" :breakpoints="[0, 0.75, 1]" @will-dismiss="$emit('close:search-modal')">
    <IonContent color="light">
      <!-- Searchbar -->
      <IonSearchbar v-model="searchText" :placeholder="translation('search_product')" />

      <!-- Filters -->
      <div class="px-2 flex md:grid md:grid-cols-4 overflow-x-auto gap-2 scrollbar-none" :class="{ 'flex-wrap': isDesktop() }">
        <DefaultSearchFilter
          :context="'category'"
          color="primary"
          :label="translation('categories')"
          chip-key="name"
          :items="categories"
          @update:filter="selectedCategories = $event"
        />

        <DefaultSearchFilter
          :context="'characteristic'"
          color="secondary"
          :label="translation('characteristics')"
          chip-key="name"
          :items="characteristics"
          @update:filter="selectedCharacteristics = $event"
        />

        <DefaultRangeFilter
          :context="'price'"
          color="tertiary"
          :label="translation('price')"
          :min="[...products].sort((a, b) => a.price - b.price)[0].price"
          :max="[...products].sort((a, b) => b.price - a.price)[0].price"
          @update:filter="selectedPriceRange = $event"
        />

        <ToggleButton
          color="primary"
          :on-label="translation('disponible_only')"
          :off-label="translation('all_services')"
          @update:on="disponibleOnly = $event"
        />
      </div>

      <!-- Filter Chips -->
      <div id="chips-row" class="flex gap-2 px-2 mt-2 overflow-x-auto scrollbar-none" :class="{ 'flex-wrap': isDesktop() }"></div>

      <!-- List -->
      <IonList class="bg-light">
        <!-- Item -->
        <SearchProductItem
          :search-text
          :products
          :categories
          :characteristics
          :selected-categories
          :selected-characteristics="selectedCharacteristics"
          :selected-price-range
          :disponible-only
        />
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
import isDesktop from '@/utils/isDesktop'
import translation from '@/utils/translation'
import { IonContent, IonList, IonModal, IonSearchbar } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import DefaultRangeFilter from './DefaultRangeFilter.vue'
import DefaultSearchFilter from './DefaultSearchFilter.vue'
/* Props */
defineProps<{
  isOpen: boolean
}>()

/* Constants */
const productComposable = useProduct()
const categoryComposable = useCategory()
const characteristicComposable = useCharacteristic()

/* Refs */
const searchText = ref<string>('')
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const characteristics = ref<Characteristic[]>([])
const selectedCategories = ref<Category[]>([])
const selectedCharacteristics = ref<Characteristic[]>([])
const selectedPriceRange = ref<{ lower: number; upper: number } | undefined>(undefined)
const disponibleOnly = ref<boolean>(false)

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
