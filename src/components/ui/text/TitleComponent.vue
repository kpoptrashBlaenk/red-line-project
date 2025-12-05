<template>
  <div v-html="title" class="text-5xl font-bold text-center"></div>
</template>

<script setup lang="ts">
import { Color } from '@/types'
import { ref } from 'vue'

/* Props */
const props = defineProps<{
  text: string
  color?: Color
}>()

/* Refs */
const title = ref<string>(
  props.text.replaceAll('<title>', `<span class="text-${props.color}">`).replaceAll('</title>', `</span>`),
)
</script>
