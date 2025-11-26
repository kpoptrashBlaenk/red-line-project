<template>
  <IonAccordion class="mt-2" value="promotion">
    <IonItem slot="header" color="secondary">
      <IonLabel class="font-semibold">Promotion Carousel</IonLabel>
    </IonItem>
    <IonList class="p-5" slot="content">
      <IonReorderGroup :disabled="false" @ionReorderEnd="$event.detail.complete()">
        <template v-for="(promotion, key) in promotions" :key>
          <IonItemSliding ref="sliding">
            <IonItem>
              <div class="grid grid-cols-[min-content_min-content_1fr] gap-3 items-center py-2">
                <IonReorder />
                <IonImg :src="promotion.image" class="w-12" />
                <IonLabel>{{ promotion.title }}</IonLabel>
              </div>

              <ClearButton slot="end" color="dark" @click="sliding[key].$el.open()">
                <IonIcon :icon="chevronForward" />
              </ClearButton>
            </IonItem>

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
      </IonReorderGroup>
    </IonList>
  </IonAccordion>
</template>

<script setup lang="ts">
/* Imports */
import { Promotion } from '$/types'
import { usePromotion } from '@/composables/promotion'
import {
  IonAccordion,
  IonIcon,
  IonImg,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonReorder,
  IonReorderGroup,
} from '@ionic/vue'
import { chevronForward, pencilOutline, trashBinOutline } from 'ionicons/icons'
import { onMounted, ref } from 'vue'
import ClearButton from '../buttons/ClearButton.vue'

/* Constants */
const { getPromotions } = usePromotion()

/* Refs */
const promotions = ref<Promotion[]>([])
const sliding = ref()

/* Lifecycle Hooks */
onMounted(async () => {
  promotions.value = await getPromotions()
})
</script>

<style lang="css" scoped>
.item-disabled {
  opacity: 1;
}
</style>
