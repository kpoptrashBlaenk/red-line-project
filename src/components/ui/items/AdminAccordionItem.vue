<template>
  <IonAccordion class="mt-2" :value>
    <IonItem slot="header" color="secondary">
      <IonLabel class="font-semibold">{{ title }}</IonLabel>
    </IonItem>

    <div class="p-5" slot="content">
      <IonList>
        <IonReorderGroup :disabled="false" @ionReorderEnd="onReorderEnd">
          <AdminReorderItem v-for="(item, key) in items" :key :item :image-key :text-key />
        </IonReorderGroup>
      </IonList>

      <SolidButton id="open-admin-form-modal" :label="translation('add')" color="success" class="mt-2" expand="block" />
    </div>
  </IonAccordion>
</template>

<script setup lang="ts">
/* Imports */
import translation from '@/utils/translation'
import { IonAccordion, IonItem, IonLabel, IonList, IonReorderGroup, ReorderEndCustomEvent } from '@ionic/vue'
import SolidButton from '../buttons/SolidButton.vue'
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
