<template>
  <!-- Footer -->
  <IonFooter>
    <IonToolbar>
      <div class="grid grid-cols-[1fr_50px] gap-5 items-center px-5 py-3">
        <IonTextarea
          v-model="messageInput"
          :placeholder="translation('ask_anything')"
          auto-grow
          counter
          :rows="1"
          :maxlength="255"
          disabled
        />
        <IonButton color="primary" fill="solid" :disabled="!messageInput.trim()">
          <IonIcon slot="icon-only" :icon="sendOutline" />
        </IonButton>
      </div>
    </IonToolbar>
  </IonFooter>
</template>

<script setup lang="ts">
/* Imports */
import translation from '@/utils/translation'
import { IonButton, IonFooter, IonIcon, IonTextarea, IonToolbar } from '@ionic/vue'
import { sendOutline } from 'ionicons/icons'
import { ref } from 'vue'

/* Refs */
const messageInput = ref<string>('')
</script>
