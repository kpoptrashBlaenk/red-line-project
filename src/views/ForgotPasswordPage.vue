<template>
  <DefaultContentLayout>
    <div class="wrap">
      <SeparatorComponent size="sm" />

      <AuthCard context="forgot" :label="translation('reset_password')" :fields :state :schema :on-submit="onSubmit" />

      <SeparatorComponent size="sm" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import AuthCard from '@/components/ui/cards/AuthCard.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { useAuth } from '@/composables/auth'
import { ForgotPasswordSchema, forgotPasswordSchema, forgotPasswordState } from '@/utils/schemas'
import translation from '@/utils/translation'
import { ref } from 'vue'

/* Constants */
const authComposable = useAuth()

/* Refs */
const fields = ref(authComposable.createForgotPasswordFields())
const state = ref(forgotPasswordState)
const schema = ref(forgotPasswordSchema())

/* Functions */
async function onSubmit(state: ForgotPasswordSchema) {
  await authComposable.forgotPassword(state)
}
</script>
