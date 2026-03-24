<template>
  <ChatbotFab @open:modal="onModalOpen" />
  <ChatbotModal
    ref="modal"
    keep-alive
    :conversation
    :choices
    @send:message="onSendMessage"
    @new:conversation="createNewConversation"
  />
</template>

<script setup lang="ts">
/* Imports */
import { Conversation, MessageChoice } from '$/types'
import { useChatbot } from '@/composables/chatbot'
import { ref } from 'vue'
import ChatbotFab from './ChatbotFab.vue'
import ChatbotModal from './ChatbotModal.vue'

/* Constants */
const { getConversation, getChoices, sendMessage, newConversation } = useChatbot()

/* Refs */
const modal = ref()
const conversation = ref<Conversation>({ id: 0, messages: [] })
const choices = ref<MessageChoice[]>([])

/* Functions */
async function onSendMessage(choice: MessageChoice) {
  // add message locally
  conversation.value.messages.push({
    id: 0,
    created_at: 'now',
    sent_by: 'user',
    message: choice.text,
  })

  // remove chocies
  choices.value = []

  // send & receive conversation updates
  await sendMessage(choice)
  fetchConversation()
}

async function createNewConversation() {
  await newConversation()
  fetchConversation()
}

function fetchConversation() {
  getConversation().then((result) => (conversation.value = result))
  getChoices().then((result) => (choices.value = result))
}

function onModalOpen() {
  fetchConversation()

  modal.value.$el.present()
}
</script>
