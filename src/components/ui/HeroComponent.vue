<template>
  <div class="bg-tertiary py-5!">
    <div v-if="title" class="text-white text-6xl font-bold mb-5 text-center px-2">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  title?: string
}>()
</script>
