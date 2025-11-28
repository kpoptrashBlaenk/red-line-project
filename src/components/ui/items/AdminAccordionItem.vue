<template>
  <IonAccordion class="mt-2" :value>
    <IonItem slot="header" color="secondary">
      <IonLabel class="font-semibold">{{ title }}</IonLabel>
    </IonItem>

    <div class="p-5" slot="content">
      <IonList>
        <IonReorderGroup :disabled="false" @ionReorderEnd="onReorderEnd">
          <AdminReorderItem
            v-for="(item, key) in items"
            :key
            :item
            :image-key
            :text-key
            :note-key
            @open:modal-form="$emit('open:modal-form', value, $event, item)"
          />
        </IonReorderGroup>
      </IonList>

      <SolidButton
        :label="translation('add')"
        color="success"
        class="mt-2"
        expand="block"
        @click="$emit('open:modal-form', value, apiMethods.post)"
      />
    </div>
  </IonAccordion>
</template>

<script setup lang="ts">
/* Imports */
import { AdminSectionKey } from '@/constants/adminPages'
import apiMethods from '@/constants/apiMethod'
import translation from '@/utils/translation'
import { IonAccordion, IonItem, IonLabel, IonList, IonReorderGroup, ReorderEndCustomEvent } from '@ionic/vue'
import SolidButton from '../buttons/SolidButton.vue'
import AdminReorderItem from './AdminReorderItem.vue'

/* Props */
const props = defineProps<{
  title: string
  value: AdminSectionKey
  items: any[]
  textKey?: string
  noteKey?: string
  imageKey?: string
  reorderCallback: (items: any) => Promise<void>
}>()

/* Functions */
function onReorderEnd(event: ReorderEndCustomEvent) {
  event.detail.complete(props.items)

  props.reorderCallback(props.items)
}
</script>
