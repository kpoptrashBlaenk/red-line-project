<template>
  <IonAccordion class="mt-2" :value>
    <IonItem slot="header" color="secondary">
      <IonLabel class="font-semibold">{{ title }}</IonLabel>
    </IonItem>
    <IonList class="p-5" slot="content">
      <IonReorderGroup :disabled="false" @ionReorderEnd="onReorderEnd">
        <AdminReorderItem v-for="(item, key) in items" :key :item :image-key :text-key />
      </IonReorderGroup>
    </IonList>
  </IonAccordion>
</template>

<script setup lang="ts">
/* Imports */
import { IonAccordion, IonItem, IonLabel, IonList, IonReorderGroup, ReorderEndCustomEvent } from '@ionic/vue'
import AdminReorderItem from './AdminReorderItem.vue'

/* Props */
const props = defineProps<{
  title: string
  value: string
  items: any[]
  textKey?: string
  imageKey?: string
  reorderCallback: (items: any) => Promise<void>
}>()

/* Functions */
function onReorderEnd(event: ReorderEndCustomEvent) {
  event.detail.complete(props.items)

  props.reorderCallback(props.items)
}
</script>
