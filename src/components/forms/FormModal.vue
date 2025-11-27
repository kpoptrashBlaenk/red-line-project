<template>
  <IonModal ref="modal" trigger="open-admin-form-modal" :is-open="true">
    <!-- Header -->
    <IonHeader>
      <IonToolbar color="tertiary" class="px-5">
        <IonTitle> {{ translation('add_promotion') }} </IonTitle>
      </IonToolbar>
    </IonHeader>

    <!-- Form -->
    <IonContent class="flex flex-col justify-end">
      <FormComponent id="modal-form" :fields :state :schema :on-submit />
    </IonContent>

    <!-- Buttons -->
    <IonFooter>
      <IonToolbar color="light">
        <div class="flex">
          <ClearButton :label="'Cancel'" color="dark" size="large" class="flex-1" @click="cancel()" />
          <ClearButton :label="'Submit'" color="dark" size="large" form="modal-form" class="flex-1" />
        </div>
      </IonToolbar>
    </IonFooter>
  </IonModal>
</template>

<script setup lang="ts">
/* Imports */
import { FormField } from '@/types'
import translation from '@/utils/translation'
import { IonContent, IonFooter, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/vue'
import { ref } from 'vue'
import z from 'zod'
import ClearButton from '../ui/buttons/ClearButton.vue'
import FormComponent from './FormComponent.vue'

/* Props */
interface Props<T extends Record<string, any>> {
  fields: FormField[]
  state: T
  schema: z.ZodType<T>
  onSubmit: (state: T) => void
}
defineProps<Props<any>>()

/* Refs */
const modal = ref()

/* Functions */
function cancel() {
  modal.value.$el.dismiss(null, 'cancel')
}
</script>

<style lang="css" scoped>
@media (min-width: 768px) {
  ion-modal {
    --border-radius: 25px;
  }
}
</style>
