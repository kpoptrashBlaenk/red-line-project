<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('login')" />

    <div class="wrap">
      <SeparatorComponent size="sm" />

      <AuthCard :label="translation('login_info')" :fields :state :schema :on-submit="onSubmit" />

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
import { useAuth } from '@/composables/auth'
import { LoginSchema, loginSchema, loginState } from '@/utils/schemas'
import translation from '@/utils/translation'
import { ref } from 'vue'

/* Constants */
const authComposable = useAuth()

/* Refs */
const fields = ref(authComposable.createLoginFields())
const state = ref(loginState)
const schema = ref(loginSchema())

/* Functions */
async function onSubmit(state: LoginSchema) {
  await authComposable.login(state)
}
</script>
