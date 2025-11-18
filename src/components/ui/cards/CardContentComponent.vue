<template>
  <div v-html="props.text" class="mt-7 text-base"></div>
</template>

<script setup lang="ts">
/* Imports */
import { CardContent } from '@/types'

/* Props */
defineProps<{
  props: CardContent
}>()
</script>
