<template>
  <div class="p-3 rounded-4xl bg-tertiary text-white cursor-pointer" @click="$emit('send:message', choice)">
    {{ translation(choice.text) }}
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { MessageChoice } from '$/types'
import translation from '@/utils/translation'

/* Props */
defineProps<{
  choice: MessageChoice
}>()
</script>
