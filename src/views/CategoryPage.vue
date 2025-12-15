<template>
  <DefaultContentLayout>
    <HeroComponent>
      <CategoryHero v-if="category" :category />
    </HeroComponent>

    <div class="wrap">
      <SeparatorComponent size="sm" />

      <!-- Product List -->
      <TitleComponent color="secondary" :text="translation('category_products_title')" />
      <div
        v-if="!isLengthZero(separatedProducts.priority)"
        class="border-gray-400 py-10"
        :class="{ 'border-b': !isLengthZero(separatedProducts.default) || !isLengthZero(separatedProducts.notDisponible) }"
      >
        <HomeProductGrid :products="separatedProducts.priority" color="secondary" context="category" />
      </div>

      <div
        v-if="!isLengthZero(separatedProducts.default)"
        class="border-gray-400 py-10"
        :class="{ 'border-b': !isLengthZero(separatedProducts.notDisponible) }"
      >
        <HomeProductGrid :products="separatedProducts.default" color="secondary" context="category" />
      </div>

      <div v-if="!isLengthZero(separatedProducts.notDisponible)" class="py-10">
        <HomeProductGrid :products="separatedProducts.notDisponible" color="secondary" context="category" />
      </div>

      <SeparatorComponent size="md" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Category, Characteristic, Product } from '$/types'
import HomeProductGrid from '@/components/grids/ProductGrid.vue'
import CategoryHero from '@/components/heroes/CategoryHero.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import TitleComponent from '@/components/ui/text/TitleComponent.vue'
import { useCategory } from '@/composables/category'
import { useCharacteristic } from '@/composables/characteristic'
import { useProduct } from '@/composables/product'
import isLengthZero from '@/utils/isLengthZero'
import translation from '@/utils/translation'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

/* Constants */
const route = useRoute()
const productComposable = useProduct()
const categoryComposable = useCategory()
const characteristicComposable = useCharacteristic()

/* Refs */
const category = ref<Category>()
const products = ref<Product[]>([])
const characteristics = ref<Characteristic[]>([])

/* Computeds */
const separatedProducts = computed(() => {
  const separatedProducts = {
    priority: [] as Product[],
    default: [] as Product[],
    notDisponible: [] as Product[],
  }

  products.value.forEach((product) => {
    if (!product.disponible) {
      separatedProducts.notDisponible.push(product)
      return
    }

    if (product.priority) {
      separatedProducts.priority.push(product)
      return
    }

    separatedProducts.priority.push(product)
  })

  return separatedProducts
})

/* Lifecycle Hooks */
onMounted(async () => {
  const id = Number(route.params.id)

  category.value = await categoryComposable.find(id)
  products.value = await productComposable.get()

  characteristics.value = await characteristicComposable.get()
})
</script>
