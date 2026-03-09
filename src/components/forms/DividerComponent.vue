<template>
  <div class="text-xl font-semibold text-primary mt-5 mb-0 md:-mb-2">
    {{ field.label }}
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { DividerField } from '@/types'

/* Props */
defineProps<{
  field: DividerField
}>()
</script>
