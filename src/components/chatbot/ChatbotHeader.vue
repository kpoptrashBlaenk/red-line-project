<template>
  <IonHeader>
    <IonToolbar color="primary">
      <div class="flex justify-between items-center w-full ps-4 pe-2 py-2">
        <!-- Avatar & Title & Status -->
        <div class="flex items-center gap-3">
          <IonIcon :icon="personCircleOutline" class="text-4xl" />
          <div class="flex flex-col leading-tight">
            <span class="text-lg font-semibold">{{ translation('chatbot') }}</span>
            <span class="text-sm text-success">{{ translation('online') }}</span>
          </div>
        </div>

        <!-- New Chat & Exit -->
        <div class="flex items-center">
          <IonButton color="light" fill="clear" @click="$emit('new:conversation')">
            {{ translation('new_chat') }}
          </IonButton>
          <IonButton color="light" fill="clear" size="large" @click="$emit('close:modal')">
            <IonIcon :icon="closeOutline" />
          </IonButton>
        </div>
      </div>
    </IonToolbar>
  </IonHeader>
</template>

<script setup lang="ts">
/* Imports */
import translation from '@/utils/translation'
import { IonButton, IonHeader, IonIcon, IonToolbar } from '@ionic/vue'
import { closeOutline, personCircleOutline } from 'ionicons/icons'
</script>
