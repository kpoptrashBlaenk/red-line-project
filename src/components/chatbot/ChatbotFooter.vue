<template>
  <!-- Footer -->
  <IonFooter>
    <IonToolbar>
      <div class="px-5 py-3">
        <!-- Choices -->
        <div class="flex flex-wrap gap-2 mb-3">
          <ChatbotChoice v-for="(choice, key) in choices" :key :choice @send:message="$emit('send:message', $event)" />
        </div>

        <!-- Input -->
        <div class="grid grid-cols-[1fr_50px] gap-5 items-center">
          <IonTextarea
            v-model="messageInput"
            :placeholder="translation('ask_anything')"
            auto-grow
            counter
            :rows="1"
            :maxlength="255"
            color="tertiary"
            disabled
          />
          <IonButton color="tertiary" fill="solid" :disabled="!messageInput.trim()">
            <IonIcon slot="icon-only" :icon="sendOutline" />
          </IonButton>
        </div>
      </div>
    </IonToolbar>
  </IonFooter>
</template>

<script setup lang="ts">
/* Imports */
import { MessageChoice } from '$/types'
import translation from '@/utils/translation'
import { IonButton, IonFooter, IonIcon, IonTextarea, IonToolbar } from '@ionic/vue'
import { sendOutline } from 'ionicons/icons'
import { ref } from 'vue'
import ChatbotChoice from './ChatbotChoice.vue'

/* Props */
defineProps<{
  choices: MessageChoice[]
}>()

/* Refs */
const messageInput = ref<string>('')
</script>
