<template>
  <IonModal :is-open :initial-breakpoint="0.75" :breakpoints="[0, 0.75]" @will-dismiss="$emit('close:search-modal')">
    <IonContent>
      <IonSearchbar placeholder="Search for products..." />
      <IonList>
        <IonItem router-link="/" button detail>
          <!-- Product Info -->
        </IonItem>
      </IonList>
    </IonContent>
  </IonModal>
</template>

<script setup lang="ts">
/* Imports */
import { IonContent, IonItem, IonList, IonModal, IonSearchbar } from '@ionic/vue'

/* Props */
defineProps<{
  isOpen: boolean
}>()
</script>
