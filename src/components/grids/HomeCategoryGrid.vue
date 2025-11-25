<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-5">
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

/* Constants */
const categories: Category[] = [
  {
    id: 1,
    image: 'https://ionicframework.com/docs/img/demos/card-media.png',
    name: 'Technology',
    index: 0,
  },
  {
    id: 2,
    image: 'https://ionicframework.com/docs/img/demos/card-media.png',
    name: 'Health',
    index: 1,
  },
  {
    id: 3,
    image: 'https://ionicframework.com/docs/img/demos/card-media.png',
    name: 'Travel',
    index: 2,
  },
  {
    id: 4,
    image: 'https://ionicframework.com/docs/img/demos/card-media.png',
    name: 'Food',
    index: 3,
  },
  {
    id: 5,
    image: 'https://ionicframework.com/docs/img/demos/card-media.png',
    name: 'Education',
    index: 4,
  },
  {
    id: 6,
    image: 'https://ionicframework.com/docs/img/demos/card-media.png',
    name: 'Sports',
    index: 5,
  },
]
</script>
