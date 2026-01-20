<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('register')" />

    <div class="wrap">
      <SeparatorComponent size="sm" />

      <AuthCard :label="translation('register_info')" :fields :state :schema :on-submit="onSubmit" />

      <SeparatorComponent size="sm" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import AuthCard from '@/components/ui/cards/AuthCard.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { FormField } from '@/types'
import { registerSchema, registerState } from '@/utils/schemas'
import translation from '@/utils/translation'
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
    element: 'phone',
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
