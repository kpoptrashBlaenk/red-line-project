<template>
  <IonItemSliding ref="sliding">
    <IonItem :lines="last ? 'none' : 'inset'">
      <!-- Item Grid -->
      <div
        class="grid gap-3 items-center py-2 overflow-hidden h-16"
        :style="{
          gridTemplateColumns: [reorder, image, true]
            .filter((col) => col)
            .map((col, index) => (index === 0 ? '1fr' : 'min-content'))
            .reverse()
            .join(' '),
        }"
      >
        <IonReorder v-if="reorder" />
        <IonImg v-if="image" :src="image(item)" class="w-12" />
        <div class="overflow-hidden">
          <div v-if="text" class="truncate text-ellipsis">{{ text(item) }}</div>
          <div v-if="note" class="truncate text-ellipsis text-gray-500 text-sm">{{ note(item) }}</div>
        </div>
      </div>

      <!-- Open Slide Button -->
      <ClearButton v-if="modify || remove" slot="end" color="dark" chevron @click="sliding.$el.open()" />
    </IonItem>

    <!-- Item Options when Slide open -->
    <IonItemOptions v-if="modify || remove" side="end">
      <IonItemOption v-if="modify" color="warning" @click="$emit('open:modal-form', apiMethod.put)">
        <IonIcon :icon="pencilOutline" class="text-xl p-3" />
      </IonItemOption>
      <IonItemOption v-if="remove" color="danger" @click="$emit('open:modal-form', apiMethod.delete)">
        <IonIcon :icon="trashBinOutline" class="text-xl p-3" />
      </IonItemOption>
    </IonItemOptions>
  </IonItemSliding>
</template>

<script setup lang="ts">
/* Imports */
import apiMethods from '@/constants/apiMethod'
import { IonIcon, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonReorder } from '@ionic/vue'
import { pencilOutline, trashBinOutline } from 'ionicons/icons'
import { ref } from 'vue'
import ClearButton from '../buttons/ClearButton.vue'

/* Props */
defineProps<{
  item: any
  last: boolean
  text?: (item: any) => string
  note?: (item: any) => string
  image?: (item: any) => string
  reorder?: boolean
  modify?: boolean
  remove?: boolean
}>()

/* Constants */ // because ts thinks these are supposed to be props
const apiMethod = apiMethods

/* Refs */
const sliding = ref()
</script>
