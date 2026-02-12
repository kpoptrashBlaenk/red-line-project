<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('login')" />

    <div class="wrap">
      <SeparatorComponent size="sm" />

      <AuthCard :label="translation('login_info')" :fields :state :schema :on-submit="onSubmit">
        <div class="text-center mt-5">
          {{ translation('no_account') }}
          <span class="text-primary cursor-pointer" @click="handleRoute(route, router, '/register')">{{
            translation('register_now')
          }}</span>
        </div>

        <div class="text-center mt-5">
          <span class="text-primary cursor-pointer" @click="handleRoute(route, router, '/forgot-password')">
            {{ translation('forgot_password') }}</span
          >
        </div>
      </AuthCard>

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
import { getLastRoute } from '@/router'
import handleRoute from '@/utils/handleRoute'
import { LoginSchema, loginSchema, loginState } from '@/utils/schemas'
import translation from '@/utils/translation'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/* Constants */
const authComposable = useAuth()
const router = useRouter()
const route = useRoute()

/* Refs */
const fields = ref(authComposable.createLoginFields())
const state = ref(loginState)
const schema = ref(loginSchema())

/* Functions */
async function onSubmit(state: LoginSchema) {
  const user = await authComposable.login(state)

  if (user) {
    route.redirectedFrom ? router.replace(route.redirectedFrom.fullPath) : getLastRoute() ? router.go(-1) : router.replace('/')
  }
}
</script>
