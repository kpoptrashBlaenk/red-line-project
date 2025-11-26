<template>
  <IonAccordion class="mt-2" :value>
    <IonItem slot="header" color="secondary">
      <IonLabel class="font-semibold">{{ title }}</IonLabel>
    </IonItem>
    <IonList class="p-5" slot="content">
      <IonReorderGroup :disabled="false" @ionReorderEnd="$event.detail.complete()">
        <AdminReorderItem v-for="(item, key) in items" :key :item :image-key :text-key />
      </IonReorderGroup>
    </IonList>
  </IonAccordion>
</template>

<script setup lang="ts">
/* Imports */
import { IonAccordion, IonItem, IonLabel, IonList, IonReorderGroup } from '@ionic/vue'
import AdminReorderItem from './AdminReorderItem.vue'

/* Props */
defineProps<{
  title: string
  value: string
  items: any[]
  textKey?: string
  imageKey?: string
}>()
</script>
