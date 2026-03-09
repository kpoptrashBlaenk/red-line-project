<template>
  <div class="w-1/2" :class="{ 'self-end': message.sent_by === 'user' }">
    <div class="rounded-2xl p-3" :class="message.sent_by === 'chatbot' ? 'bg-light ' : 'bg-secondary text-white'">
      {{ translation(message.message) }}
    </div>
    <div class="text-xs text-gray-500" :class="message.sent_by === 'chatbot' ? 'ps-2' : 'pe-2 text-right'">
      {{ formatDate(message.created_at, true) }}
    </div>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { Message } from '$/types'
import formatDate from '@/utils/formatDate'
import translation from '@/utils/translation'

/* Props */
defineProps<{
  message: Message
}>()
</script>
