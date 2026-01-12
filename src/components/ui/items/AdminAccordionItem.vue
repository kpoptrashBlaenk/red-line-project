<template>
  <IonAccordion class="mt-2" :value>
    <IonItem slot="header" color="secondary">
      <IonLabel class="font-semibold">{{ title }}</IonLabel>
    </IonItem>

    <div slot="content">
      <IonList>
        <IonReorderGroup :disabled="false" @ionReorderEnd="onReorderEnd">
          <AdminReorderItem
            v-for="(item, key) in items"
            :key
            :item
            :last="key === items.length - 1"
            :image
            :text
            :note
            :reorder
            :modify
            :remove
            @open:modal-form="$emit('open:modal-form', value, $event, item)"
          />
        </IonReorderGroup>
      </IonList>

      <div v-if="add" class="px-5 pb-5">
        <SolidButton
          :label="translate('add')"
          color="success"
          class="mt-2"
          expand="block"
          @click="$emit('open:modal-form', value, apiMethod.post)"
          data-cy="admin-add-button"
        />
      </div>
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
  text?: (item: any) => string
  note?: (item: any) => string
  image?: (item: any) => string
  reorderCallback?: (items: any) => Promise<void>
  reorder?: boolean
  add?: boolean
  modify?: boolean
  remove?: boolean
}>()

/* Constants */ // because ts thinks these are supposed to be props
const apiMethod = apiMethods
const translate = translation

/* Functions */
function onReorderEnd(event: ReorderEndCustomEvent) {
  event.detail.complete(props.items)

  props.reorderCallback?.(props.items)
}
</script>
