<template>
  <IonCard class="active:scale-105 hover:scale-105 transition-all cursor-pointer" @click="handleRoute(route, router, link)">
    <IonImg :src="image" class="h-24 object-cover" />
    <IonCardHeader :color="color" class="p-1">
      <IonCardTitle class="text-center">{{ title }}</IonCardTitle>
    </IonCardHeader>
  </IonCard>
</template>

<script setup lang="ts">
/* Imports */
import { Color } from '@/types'
import handleRoute from '@/utils/handleRoute'
import { IonCard, IonCardHeader, IonCardTitle, IonImg } from '@ionic/vue'
import { useRoute, useRouter } from 'vue-router'

/* Constants */
const route = useRoute()
const router = useRouter()

/* Props */
defineProps<{
  image: string
  link: string
  title: string
  color: Color
}>()
</script>
