<template>
  <IonPage>
    <DefaultMenuLayout />
    <ChatbotComponent />

    <IonRouterOutlet />
  </IonPage>
</template>

<script setup lang="ts">
/* Imports */
import ChatbotComponent from '@/components/chatbot/ChatbotComponent.vue'
import { IonPage, IonRouterOutlet } from '@ionic/vue'
import DefaultMenuLayout from './DefaultMenuLayout.vue'
</script>
