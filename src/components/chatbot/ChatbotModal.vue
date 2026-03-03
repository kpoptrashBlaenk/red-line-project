<template>
  <IonModal ref="modal">
    <!-- Header -->
    <ChatbotHeader @close:modal="modal.$el.dismiss()" />

    <!-- Content -->
    <IonContent>
      <div class="flex flex-col p-5">
        <ChatbotMessage v-for="(message, key) in conversation.messages" :key :message />
      </div>
    </IonContent>

    <!-- Footer -->
    <ChatbotFooter />
  </IonModal>
</template>

<script setup lang="ts">
/* Imports */
import { Conversation } from '$/types'
import { IonContent, IonModal } from '@ionic/vue'
import { ref } from 'vue'
import ChatbotFooter from './ChatbotFooter.vue'
import ChatbotHeader from './ChatbotHeader.vue'
import ChatbotMessage from './ChatbotMessage.vue'

/* Props */
defineProps<{
  conversation: Conversation
}>()

/* Refs */
const modal = ref()
</script>
