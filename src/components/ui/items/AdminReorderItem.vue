<template>
  <IonItemSliding ref="sliding">
    <IonItem :lines="last ? 'none' : 'inset'">
      <!-- Item Grid -->
      <div
        class="grid gap-3 items-center py-2 overflow-hidden h-16"
        :style="{
          gridTemplateColumns: [reorder, imageKey, true]
            .filter((col) => col)
            .map((col, index) => (index === 0 ? '1fr' : 'min-content'))
            .reverse()
            .join(' '),
        }"
      >
        <IonReorder v-if="reorder" />
        <IonImg v-if="imageKey" :src="item[imageKey]" class="w-12" />
        <div class="overflow-hidden">
          <IonLabel v-if="textKey" class="truncate text-ellipsis">{{ translation(item[textKey]) }}</IonLabel>
          <IonNote v-if="noteKey" class="truncate text-ellipsis">{{ translation(item[noteKey]) }}</IonNote>
        </div>
      </div>

      <!-- Open Slide Button -->
      <ClearButton v-if="modify || remove" slot="end" color="dark" chevron @click="sliding.$el.open()" />
    </IonItem>

    <!-- Item Options when Slide open -->
    <IonItemOptions v-if="modify || remove" side="end">
      <IonItemOption v-if="modify" color="warning" @click="$emit('open:modal-form', apiMethods.put)">
        <IonIcon :icon="pencilOutline" class="text-xl p-3" />
      </IonItemOption>
      <IonItemOption v-if="remove" color="danger" @click="$emit('open:modal-form', apiMethods.delete)">
        <IonIcon :icon="trashBinOutline" class="text-xl p-3" />
      </IonItemOption>
    </IonItemOptions>
  </IonItemSliding>
</template>

<script setup lang="ts">
/* Imports */
import apiMethods from '@/constants/apiMethod'
import translation from '@/utils/translation'
import {
  IonIcon,
  IonImg,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonNote,
  IonReorder,
} from '@ionic/vue'
import { pencilOutline, trashBinOutline } from 'ionicons/icons'
import { ref } from 'vue'
import ClearButton from '../buttons/ClearButton.vue'

/* Props */
defineProps<{
  item: any
  last: boolean
  textKey?: string
  noteKey?: string
  imageKey?: string
  reorder?: boolean
  modify?: boolean
  remove?: boolean
}>()

/* Refs */
const sliding = ref()
</script>
