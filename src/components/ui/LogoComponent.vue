<template>
  <div class="inline-block cursor-pointer" @click="handleRoute(route, router, '/home')">
    <IonImg
      :src="`https://cyna-it.fr/wp-content/themes/theme-cyna-it/images/logo-cyna${light ? '-white' : ''}.svg`"
      class="w-32"
    />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import handleRoute from '@/utils/handleRoute'
import { IonImg } from '@ionic/vue'
import { useRoute, useRouter } from 'vue-router'

/* Props */
defineProps<{
  light: boolean
}>()

/* Constants */
const route = useRoute()
const router = useRouter()
</script>
