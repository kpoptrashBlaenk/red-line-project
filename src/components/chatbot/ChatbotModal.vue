<template>
  <IonModal ref="modal" keep-contents-mounted>
    <!-- Header -->
    <ChatbotHeader @close:modal="modal.$el.dismiss()" @new:conversation="$emit('new:conversation')" />

    <!-- Content -->
    <IonContent ref="content">
      <div id="message-container" class="flex flex-col p-5">
        <ChatbotMessage v-for="(message, key) in conversation.messages" :key :message />
      </div>
    </IonContent>

    <!-- Footer -->
    <ChatbotFooter :choices @send:message="$emit('send:message', $event)" />
  </IonModal>
</template>

<script setup lang="ts">
/* Imports */
import { Conversation, MessageChoice } from '$/types'
import { IonContent, IonModal } from '@ionic/vue'
import { onMounted, ref, useTemplateRef } from 'vue'
import ChatbotFooter from './ChatbotFooter.vue'
import ChatbotHeader from './ChatbotHeader.vue'
import ChatbotMessage from './ChatbotMessage.vue'

/* Props */
defineProps<{
  conversation: Conversation
  choices: MessageChoice[]
}>()

/* Refs */
const modal = ref()
const content = useTemplateRef('content')

/* Lifecycle Hooks */
onMounted(() => {
  const observer = new ResizeObserver(() => {
    content.value?.$el.scrollToBottom()
    console.log('Content scrolled to bottom')
  })

  observer.observe(content.value?.$el)
})
</script>
