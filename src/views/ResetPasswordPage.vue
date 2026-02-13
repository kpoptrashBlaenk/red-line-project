<template>
  <DefaultContentLayout>
    <div class="wrap">
      <SeparatorComponent size="sm" />

      <AuthCard :label="translation('reset_password')" :fields :state :schema :on-submit="onSubmit" />

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
import handleRoute from '@/utils/handleRoute'
import { ResetPasswordSchema, resetPasswordSchema, resetPasswordState } from '@/utils/schemas'
import translation from '@/utils/translation'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/* Constants */
const authComposable = useAuth()
const route = useRoute()
const router = useRouter()

/* Refs */
const fields = ref(authComposable.createResetPasswordFields())
const state = ref(resetPasswordState)
const schema = ref(resetPasswordSchema())

/* Functions */
async function onSubmit(state: ResetPasswordSchema) {
  const token = route.params.token

  await authComposable.resetPassword(Array.isArray(token) ? token[0] : token, state)

  setTimeout(() => {
    handleRoute(route, router, '/login')
  }, 1000)
}
</script>
