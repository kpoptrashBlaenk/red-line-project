<template>
  <IonItemSliding ref="sliding">
    <IonItem>
      <!-- Item Grid -->
      <div
        class="grid gap-3 items-center py-2 overflow-hidden"
        :class="{
          'grid-cols-[min-content_min-content_1fr]': imageKey,
          'grid-cols-[min-content_1fr]': !imageKey,
        }"
      >
        <IonReorder />
        <IonImg v-if="imageKey" :src="item[imageKey]" class="w-12" />
        <div class="overflow-hidden">
          <IonLabel v-if="textKey" class="truncate text-ellipsis">{{ translation(item[textKey]) }}</IonLabel>
          <IonNote v-if="noteKey" class="truncate text-ellipsis">{{ translation(item[noteKey]) }}</IonNote>
        </div>
      </div>

      <!-- Open Slide Button -->
      <ClearButton slot="end" color="dark" chevron @click="sliding.$el.open()" />
    </IonItem>

    <!-- Item Options when Slide open -->
    <IonItemOptions side="end">
      <IonItemOption color="warning" @click="$emit('open:modal-form', apiMethods.put)">
        <IonIcon :icon="pencilOutline" class="text-xl p-3" />
      </IonItemOption>
      <IonItemOption color="danger" @click="$emit('open:modal-form', apiMethods.delete)">
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
  textKey?: string
  noteKey?: string
  imageKey?: string
}>()

/* Refs */
const sliding = ref()
</script>
