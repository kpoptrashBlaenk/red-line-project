<template>
  <ChatbotFab @open:modal="modal.$el.present()" />
  <ChatbotModal ref="modal" :conversation />
</template>

<script setup lang="ts">
/* Imports */
import { Conversation } from '$/types'
import { useChatbot } from '@/composables/chatbot'
import { onMounted, ref } from 'vue'
import ChatbotFab from './ChatbotFab.vue'
import ChatbotModal from './ChatbotModal.vue'

/* Constants */
const { getConversation } = useChatbot()

/* Refs */
const modal = ref()
const conversation = ref<Conversation>({ id: 0, messages: [] })

/* Lifecycle Hooks */
onMounted(async () => {
  getConversation().then((result) => (conversation.value = result))

  modal.value.$el.present()
})
</script>
