<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-3/4 mx-auto sm:w-full">
    <ImageTitleCard
      v-for="(product, key) in products"
      :key
      :color
      :image="product.image[0]"
      :title="translation(product.name)"
      :subtitle="isHome() ? undefined : `${product.price}€`"
      :note="isHome() ? undefined : product.disponible ? undefined : translation('not_disponible')"
      :link="`/product/${product.id}`"
    />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { Product } from '$/types'
import { Color } from '@/types'
import translation from '@/utils/translation'
import ImageTitleCard from '../ui/cards/ImageTitleCard.vue'

/* Props */
const props = defineProps<{
  products: Product[]
  color: Color
  context: 'home' | 'category'
}>()

function isHome() {
  return props.context === 'home'
}
</script>
