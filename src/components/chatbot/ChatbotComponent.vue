<template>
  <ChatbotFab @open:modal="modal.$el.present()" />
  <ChatbotModal ref="modal" :conversation :choices @send:message="onSendMessage" />
</template>

<script setup lang="ts">
/* Imports */
import { Conversation, MessageChoice } from '$/types'
import { useChatbot } from '@/composables/chatbot'
import formatDate from '@/utils/formatDate'
import { onMounted, ref } from 'vue'
import ChatbotFab from './ChatbotFab.vue'
import ChatbotModal from './ChatbotModal.vue'

/* Constants */
const { getConversation, getChoices, sendMessage } = useChatbot()

/* Refs */
const modal = ref()
const conversation = ref<Conversation>({ id: 0, messages: [] })
const choices = ref<MessageChoice[]>([])

/* Lifecycle Hooks */
onMounted(async () => {
  getConversation().then((result) => (conversation.value = result))
  getChoices().then((result) => (choices.value = result))

  modal.value.$el.present()
})

/* Functions */
async function onSendMessage(choice: MessageChoice) {
  // add message locally
  conversation.value.messages.push({
    id: 0,
    created_at: formatDate(new Date().toISOString(), true),
    sent_by: 'user',
    message: choice.text,
  })

  // remove chocies
  choices.value = []

  // send & receive conversation updates
  await sendMessage(choice).then(() => {
    getConversation().then((result) => {
      conversation.value = result
    })
    getChoices().then((result) => (choices.value = result))
  })
}
</script>
