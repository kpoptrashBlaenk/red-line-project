<template>
  <div class="flex flex-wrap justify-center gap-5 mt-10">
    <ImageTitleCard
      v-for="(product, key) in products"
      :key
      :color
      :image="product.image"
      :title="translation(product.name)"
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
defineProps<{
  products: Product[]
  color: Color
}>()
</script>
