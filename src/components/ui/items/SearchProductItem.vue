<template>
  <!-- Item -->
  <IonItem
    v-for="(product, key) in filteredProducts"
    :key
    button
    detail
    color="light"
    lines="full"
    :class="{ 'opacity-60': !product.disponible }"
    @click="
      () => {
        $emit('close:search-modal')
        handleRoute(route, router, `/product/${product.id}`)
      }
    "
  >
    <div class="grid grid-cols-[80px_1fr_auto] py-3 gap-4 items-start w-full">
      <!-- Image -->
      <IonImg :src="product.image[0]" class="my-auto" />

      <!-- Name & Description -->
      <div>
        <IonLabel class="font-bold mb-1 text-xl!" color="primary">{{ translation(product.name) }}</IonLabel>
        <div class="text-gray-500 text-sm leading-4">{{ translation(product.description_functionality) }}</div>
      </div>

      <!-- Category & Price -->
      <div class="font-semibold text-lg text-end">
        <IonLabel color="primary">{{ translation(product.category?.name) }}</IonLabel>
        <IonLabel color="secondary" :class="{ 'line-through': !product.disponible }">{{ product.price }}€</IonLabel>
        <IonLabel v-if="!product.disponible" color="tertiary">{{ translation('not_disponible') }}</IonLabel>
      </div>

      <!-- Characteristics -->
      <div class="col-span-3 flex flex-wrap gap-1 mt-2">
        <ChipComponent
          v-for="(characteristic, key) in product.characteristics"
          :key="key"
          :label="translation(characteristic?.name)"
          :color="
            characteristic?.type === 'performance' ? 'primary' : characteristic?.type === 'scalability' ? 'secondary' : 'tertiary'
          "
        />
      </div>
    </div>
  </IonItem>
</template>

<script setup lang="ts">
/* Imports */
import { Category, Characteristic, Product } from '$/types'
import { useSearchFilter } from '@/stores/searchFilter'
import findById from '@/utils/findById'
import handleRoute from '@/utils/handleRoute'
import searchArray from '@/utils/searchArray'
import translation from '@/utils/translation'
import { IonImg, IonItem, IonLabel } from '@ionic/vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ChipComponent from '../ChipComponent.vue'

/* Props */
const props = defineProps<{
  products: Product[]
  categories: Category[]
  characteristics: Characteristic[]
}>()

/* Emits */
defineEmits(['close:search-modal'])

/* Constants */
const searchFilterStore = useSearchFilter()
const router = useRouter()
const route = useRoute()

/* Computeds */
const filteredProducts = computed(() => {
  // default
  let results = props.products

  // disponbility filter
  if (searchFilterStore.disponibleOnly) {
    results = results.filter((result) => result.disponible)
  }

  // category filter
  if (searchFilterStore.selectedCategories.length > 0) {
    results = results.filter((result) =>
      searchFilterStore.selectedCategories.some((category) => category.id === result.category_id),
    )
  }

  // price range filter
  if (searchFilterStore.selectedPriceRange) {
    const { lower, upper } = searchFilterStore.selectedPriceRange

    results = results.filter((result) => result.price >= lower && result.price <= upper)
  }

  // characteristics filter
  if (searchFilterStore.selectedCharacteristics.length > 0) {
    results = results.filter((result) =>
      searchFilterStore.selectedCharacteristics.some(
        (characteristic) =>
          result.characteristics_performance_ids.find((charId) => charId === characteristic.id) ||
          result.characteristics_scalability_ids.find((charId) => charId === characteristic.id) ||
          result.characteristics_level_ids.find((charId) => charId === characteristic.id),
      ),
    )
  }

  // search
  results = searchArray(results, searchFilterStore.searchText, [
    'name',
    'description_functionality',
    'description_advantage',
    'description_security',
  ])

  // sort
  results = results.sort((a, b) => {
    switch (searchFilterStore.sortBy) {
      case 'disponible':
        return (b.disponible ? 1 : 0) - (a.disponible ? 1 : 0)
      case 'new':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case 'old':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      case 'priceHL':
        return b.price - a.price
      case 'priceLH':
        return a.price - b.price
      default:
        return 0
    }
  })

  // flatten
  return results.map((product) => ({
    ...product,
    category: findById(props.categories, product.category_id),
    characteristics: [
      ...product.characteristics_performance_ids,
      ...product.characteristics_scalability_ids,
      ...product.characteristics_level_ids,
    ].map((characteristicId) => findById(props.characteristics, characteristicId)),
  }))
})
</script>
