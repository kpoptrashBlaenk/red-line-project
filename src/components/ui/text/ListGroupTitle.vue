<template>
  <div class="mx-2 mb-3 ps-2 text-xl font-bold border-b border-gray-400">
    {{ title }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
