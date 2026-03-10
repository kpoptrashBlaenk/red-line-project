<template>
  <div v-if="size === '2xs'" class="pt-4"></div>
  <div v-else-if="size === 'xs'" class="pt-8"></div>
  <div v-else-if="size === 'sm'" class="pt-16"></div>
  <div v-else-if="size === 'md'" class="pt-24"></div>
  <div v-else class="pt-32"></div>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  size: '2xs' | 'xs' | 'sm' | 'md' | 'xl'
}>()
</script>
