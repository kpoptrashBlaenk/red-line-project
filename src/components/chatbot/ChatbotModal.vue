<template>
  <IonModal ref="modal">
    <!-- Header -->
    <IonHeader>
      <IonToolbar color="primary">
        <div class="flex justify-between items-center w-full ps-4 pe-2 py-2">
          <!-- Avatar & Title & Status -->
          <div class="flex items-center gap-3">
            <IonIcon :icon="personCircleOutline" class="text-4xl" />
            <div class="flex flex-col leading-tight">
              <span class="text-lg font-semibold">Chatbot</span>
              <span class="text-sm text-success">Online</span>
            </div>
          </div>

          <!-- New Chat & Exit -->
          <div class="flex items-center">
            <IonButton color="light" fill="clear">
              {{ translation('new_chat') }}
            </IonButton>
            <IonButton color="light" fill="clear" size="large" @click="modal.$el.dismiss()">
              <IonIcon :icon="closeOutline" />
            </IonButton>
          </div>
        </div>
      </IonToolbar>
    </IonHeader>

    <!-- Body -->
    <div class="flex flex-col p-5">
      <div v-for="(message, key) in conversation.messages" :key class="w-1/2" :class="{ 'self-end': message.sent_by === 'user' }">
        <div class="rounded-2xl p-3" :class="message.sent_by === 'chatbot' ? 'bg-light ' : 'bg-secondary text-white'">
          {{ translation(message.message) }}
        </div>
        <div class="text-xs text-gray-500" :class="message.sent_by === 'chatbot' ? 'ps-2' : 'pe-2 text-right'">
          {{ formatDate(message.created_at, true) }}
        </div>
      </div>
    </div>

    <!-- Footer -->
  </IonModal>
</template>

<script setup lang="ts">
/* Imports */
import { Conversation } from '$/types'
import formatDate from '@/utils/formatDate'
import translation from '@/utils/translation'
import { IonButton, IonHeader, IonIcon, IonModal, IonToolbar } from '@ionic/vue'
import { closeOutline, personCircleOutline } from 'ionicons/icons'
import { ref } from 'vue'

/* Props */
defineProps<{
  conversation: Conversation
}>()

/* Refs */
const modal = ref()
</script>
