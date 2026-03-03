<template>
  <IonPage>
    <DefaultMenuLayout />
    <ChatbotComponent v-if="userStore.user" />

    <IonRouterOutlet />
  </IonPage>
</template>

<script setup lang="ts">
/* Imports */
import ChatbotComponent from '@/components/chatbot/ChatbotComponent.vue'
import { useUserStore } from '@/stores/user'
import { IonPage, IonRouterOutlet } from '@ionic/vue'
import DefaultMenuLayout from './DefaultMenuLayout.vue'

/* Constants */
const userStore = useUserStore()
</script>
