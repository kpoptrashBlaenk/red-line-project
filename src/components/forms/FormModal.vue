<template>
  <IonModal ref="modal" :is-open>
    <!-- Header -->
    <IonHeader>
      <IonToolbar color="tertiary" class="px-5">
        <IonTitle> {{ translation('details') }} </IonTitle>
      </IonToolbar>
    </IonHeader>

    <!-- Form -->
    <IonContent>
      <FormComponent id="modal-form" :fields :state :schema :on-submit />
    </IonContent>

    <!-- Buttons -->
    <IonFooter>
      <IonToolbar color="light">
        <div class="flex">
          <ClearButton :label="'Cancel'" color="dark" size="large" class="flex-1" @click="modal.$el.dismiss()" />
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
defineProps<{
  isOpen: boolean
  fields: FormField[]
  state: any
  schema: z.ZodType<any> | undefined
  onSubmit: (state: any) => void
}>()

/* Refs */
const modal = ref()
</script>

<style lang="css" scoped>
@media (min-width: 768px) {
  ion-modal {
    --border-radius: 25px;
    --min-height: 610px;
    --min-width: 75%;
  }
}
</style>
