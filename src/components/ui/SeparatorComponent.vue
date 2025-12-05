<template>
  <div v-if="size === 'xs'" class="pt-8"></div>
  <div v-else-if="size === 'sm'" class="pt-16"></div>
  <div v-else-if="size === 'md'" class="pt-24"></div>
  <div v-else class="pt-32"></div>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  size: 'xs' | 'sm' | 'md' | 'xl'
}>()
</script>
