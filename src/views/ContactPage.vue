<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('contact')" />

    <div class="wrap">
      <SeparatorComponent size="sm" />

      <FormComponent id="contact-form" :fields :state="contactState" :schema="contactSchema()" :on-submit />

      <div class="flex justify-center mt-5">
        <SolidButton form="contact-form" :label="translation('submit')" color="primary" />
      </div>

      <SeparatorComponent size="sm" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import FormComponent from '@/components/forms/FormComponent.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import SolidButton from '@/components/ui/buttons/SolidButton.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { useContact } from '@/composables/contact'
import { FormField } from '@/types'
import { ContactSchema, contactSchema, contactState } from '@/utils/schemas'
import translation from '@/utils/translation'
import { ref } from 'vue'

/* Constants */
const { createFields, send } = useContact()

/* Refs */
const fields = ref<FormField[]>(createFields())

/* Functions */
async function onSubmit(data: ContactSchema) {
  await send(data)

  contactState.subject = undefined
  contactState.text = undefined
}
</script>
