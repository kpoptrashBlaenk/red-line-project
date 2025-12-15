<template>
  <div class="sm:mx-auto relative text-white wrap flex flex-col items-center">
    <div class="relative max-w-lg">
      <img ref="imageRef" :src="category?.image[0]" class="rounded-3xl" />
      <div class="absolute text-5xl text-nowrap font-extrabold bottom-0 px-5 bg-primary w-full opacity-80 rounded-b-3xl">
        {{ translation(category?.name) }}
      </div>
    </div>

    <div class="px-2 my-5 text-xl md:text-3xl font-semibold">
      {{ translation(category?.description) }}
    </div>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { Category } from '$/types'
import translation from '@/utils/translation'

/* Props */
defineProps<{
  category: Category
}>()
</script>
