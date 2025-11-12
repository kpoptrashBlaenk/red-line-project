<template>
  <ul class="list-disc font-semibold text-base pl-5 mt-4">
    <li v-for="(item, key) in props.items" :key class="mb-2.5">
      {{ item }}
    </li>
  </ul>
</template>

<script setup lang="ts">
/* Imports */
import { CardList } from '@/types'

/* Props */
defineProps<{
  props: CardList
}>()
</script>
