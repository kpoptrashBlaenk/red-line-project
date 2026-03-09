<template>
  <IonButton fill="outline" :color="color" :form type="submit" @click="link ? handleRoute(route, router, link) : false">
    {{ label }}
    <IonIcon v-if="icon" :icon class="ms-1" />
  </IonButton>
</template>

<script setup lang="ts">
/* Imports */
import { Color } from '@/types'
import handleRoute from '@/utils/handleRoute'
import { IonButton, IonIcon } from '@ionic/vue'
import { useRoute, useRouter } from 'vue-router'

/* Props */
defineProps<{
  label?: string
  link?: string
  color: Color
  icon?: string
  selected?: boolean
  form?: string
}>()

/* Constants */
const router = useRouter()
const route = useRoute()
</script>
