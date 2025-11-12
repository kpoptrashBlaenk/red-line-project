<template>
  <div>
    {{ props.text }}
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { CardContent } from '@/types'

/* Props */
defineProps<{
  props: CardContent
}>()
</script>
