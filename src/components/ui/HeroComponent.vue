<template>
  <div class="bg-gradient py-5">
    <div class="text-white text-6xl font-bold mb-10 text-center px-2">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  title: string
}>()
</script>
