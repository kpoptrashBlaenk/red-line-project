<template>
  <IonCard class="sm:mx-5 pb-5">
    <IonCardContent class="text-black">
      <DividerComponent
        :field="{
          element: 'divider',
          label,
        }"
        class="text-center sm:px-10 mb-5"
      />
      <FormComponent id="auth-form" :fields :state :schema :on-submit="onSubmit" />
      <SolidButton color="primary" :label="translation('submit')" expand="block" form="auth-form" class="mx-10" />

      <slot></slot>
    </IonCardContent>
  </IonCard>
</template>

<script setup lang="ts">
/* Imports */
import DividerComponent from '@/components/forms/DividerComponent.vue'
import FormComponent from '@/components/forms/FormComponent.vue'
import SolidButton from '@/components/ui/buttons/SolidButton.vue'
import { FormField } from '@/types'
import translation from '@/utils/translation'
import { IonCard, IonCardContent } from '@ionic/vue'
import z from 'zod'

/* Props */
defineProps<{
  label: string
  fields: FormField[]
  state: any
  schema: z.ZodType<any> | undefined
  onSubmit: (state: any) => Promise<void>
}>()
</script>
