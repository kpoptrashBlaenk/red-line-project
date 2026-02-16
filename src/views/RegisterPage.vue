<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('register')" />

    <div class="wrap">
      <SeparatorComponent size="sm" />

      <AuthCard context="register" :label="translation('register_info')" :fields :state :schema :on-submit="onSubmit">
        <div class="text-center mt-5">
          {{ translation('already_account') }}
          <span class="text-primary cursor-pointer" @click="handleRoute(route, router, '/login')">{{
            translation('sign_in_now')
          }}</span>
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
import { RegisterSchema, registerSchema, registerState } from '@/utils/schemas'
import translation from '@/utils/translation'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/* Constants */
const authComposable = useAuth()

/* Refs */
const fields = ref(authComposable.createRegisterFields())
const state = ref(registerState)
const schema = ref(registerSchema())
const router = useRouter()
const route = useRoute()

/* Functions */
async function onSubmit(state: RegisterSchema) {
  const user = await authComposable.register(state)

  if (user) {
    route.redirectedFrom ? router.replace(route.redirectedFrom.fullPath) : getLastRoute() ? router.go(-1) : router.replace('/')
  }
}
</script>
