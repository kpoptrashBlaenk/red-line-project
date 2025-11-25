<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-10">
    <ImageTitleCard
      v-for="(category, key) in categories"
      :key
      :image="category.image"
      :title="category.name"
      :link="`/category/${category.id}`"
    />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { Category } from '$/types'
import ImageTitleCard from '../ui/cards/ImageTitleCard.vue'

/* Props */
defineProps<{
  categories: Category[]
}>()
</script>
