<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('register')" />

    <div class="wrap">
      <SeparatorComponent size="sm" />

      <IonCard class="mx-5 pb-5">
        <IonCardContent class="text-black">
          <DividerComponent
            :field="{
              element: 'divider',
              label: translation('register_info'),
            }"
            class="text-center px-10 mb-5"
          />
          <FormComponent id="register-form" :fields :state :schema :on-submit="onSubmit" />
          <SolidButton color="primary" :label="translation('submit')" expand="block" form="register-form" class="mx-10" />
        </IonCardContent>
      </IonCard>

      <SeparatorComponent size="sm" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import DividerComponent from '@/components/forms/DividerComponent.vue'
import FormComponent from '@/components/forms/FormComponent.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import SolidButton from '@/components/ui/buttons/SolidButton.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { FormField } from '@/types'
import { registerSchema, registerState } from '@/utils/schemas'
import translation from '@/utils/translation'
import { IonCard, IonCardContent } from '@ionic/vue'
import { ref } from 'vue'

/* Refs */
const fields = ref([
  {
    element: 'input',
    name: 'first_name',
    label: translation('first_name'),
    no_padding: true,
    stacked: true,
  },
  {
    element: 'input',
    name: 'last_name',
    label: translation('last_name'),
    no_padding: true,
    stacked: true,
  },
  {
    element: 'input',
    name: 'email',
    label: translation('email'),
    no_padding: true,
    stacked: true,
  },
  {
    element: 'input',
    name: 'password',
    label: translation('password'),
    no_padding: true,
    stacked: true,
    type: 'password',
  },
  {
    element: 'input',
    name: 'confirm_password',
    label: translation('confirm_password'),
    no_padding: true,
    stacked: true,
    type: 'password',
  },
  {
    element: 'input',
    name: 'phone',
    label: translation('phone'),
    no_padding: true,
    stacked: true,
  },
] as FormField[])
const state = ref(registerState)
const schema = ref(registerSchema())

/* Functions */
async function onSubmit(state: any) {
  console.log(state)
}
</script>
