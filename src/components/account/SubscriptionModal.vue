<template>
  <!-- Subscription Modal -->
  <IonModal ref="modal">
    <!-- Header -->
    <IonHeader>
      <IonToolbar color="tertiary" class="px-5">
        <IonTitle> {{ title }} </IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <!-- Price Card -->
      <IonCard color="light" class="py-5 lg:py-10 mx-5 mt-5">
        <IonCardContent>
          <slot></slot>
        </IonCardContent>
      </IonCard>

      <SolidButton
        v-if="active"
        :label="translation('deactivate')"
        color="danger"
        size="large"
        expand="block"
        class="mt-5 mx-5"
        @click="$emit('open:alert')"
      />
    </IonContent>

    <!-- Buttons -->
    <IonFooter>
      <IonToolbar color="light">
        <div class="flex">
          <ClearButton :label="translation('cancel')" color="dark" size="large" class="flex-1" @click="modal.$el.dismiss()" />
          <ClearButton :label="translation(active ? 'submit' : 'reactivate')" color="dark" size="large" class="flex-1" @click="submit()" />
        </div>
      </IonToolbar>
    </IonFooter>
  </IonModal>
</template>

<script setup lang="ts">
/* Imports */
import translation from '@/utils/translation'
import { IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/vue'
import { ref } from 'vue'
import ClearButton from '../ui/buttons/ClearButton.vue'
import SolidButton from '../ui/buttons/SolidButton.vue'

/* Props */
defineProps<{
  title: string
  active?: boolean
  submit: () => Promise<void>
}>()

/* Refs */
const modal = ref()

/* Exposes */
defineExpose({
  open: () => modal.value.$el.present(),
  close: () => modal.value.$el.dismiss(),
})
</script>

<style lang="css" scoped>
ion-modal {
  --width: 100%;
  --height: 100%;
  --max-width: 900px;
  --max-height: 700px;
}
</style>
