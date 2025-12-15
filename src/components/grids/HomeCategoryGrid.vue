<template>
  <div class="flex flex-wrap justify-center gap-5 mt-10">
    <ImageTitleCard
      v-for="(category, key) in categories"
      :key
      :image="category.image[0]"
      :title="translation(category.name)"
      :link="`/category/${category.id}`"
      :color
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
