<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-3/4 mx-auto sm:w-full">
    <ImageTitleCard
      v-for="(category, key) in categories"
      :key
      :image="category.image[0]"
      :title="translation(category.name)"
      :color
      :link="`/category/${category.id}`"
      router-direction="forward"
      :data-cy="`home-category-card-${category.id}`"
    />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { Category } from '$/types'
import { Color } from '@/types'
import translation from '@/utils/translation'
import ImageTitleCard from '../ui/cards/ImageTitleCard.vue'

/* Props */
defineProps<{
  categories: Category[]
  color: Color
}>()
</script>
