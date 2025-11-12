<template>
  <div class="text-xl font-extrabold mt-7">
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
