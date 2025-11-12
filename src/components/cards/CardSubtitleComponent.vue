<template>
  <div class="text-xl font-extrabold mb-5">
    {{ props.text }}
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { CardSubtitle } from '@/types'

/* Props */
defineProps<{
  props: CardSubtitle
}>()
</script>
