<template>
  <IonItemSliding ref="sliding">
    <IonItem>
      <!-- Item Grid -->
      <div class="grid grid-cols-[min-content_min-content_1fr] gap-3 items-center py-2">
        <IonReorder />
        <IonImg v-if="imageKey" :src="item[imageKey]" class="w-12" />
        <IonLabel v-if="textKey">{{ item[textKey] }}</IonLabel>
      </div>

      <!-- Open Slide Button -->
      <ClearButton slot="end" color="dark" @click="sliding.$el.open()" />
    </IonItem>

    <!-- Item Options when Slide open -->
    <IonItemOptions side="end">
      <IonItemOption color="warning">
        <IonIcon :icon="pencilOutline" class="text-xl p-0" />
      </IonItemOption>
      <IonItemOption color="danger">
        <IonIcon :icon="trashBinOutline" class="text-xl p-0" />
      </IonItemOption>
    </IonItemOptions>
  </IonItemSliding>
</template>

<script setup lang="ts">
/* Imports */
import { IonIcon, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonReorder } from '@ionic/vue'
import { pencilOutline, trashBinOutline } from 'ionicons/icons'
import { ref } from 'vue'
import ClearButton from '../buttons/ClearButton.vue'

/* Props */
defineProps<{
  item: any
  textKey?: string
  imageKey?: string
}>()

/* Refs */
const sliding = ref()
</script>
