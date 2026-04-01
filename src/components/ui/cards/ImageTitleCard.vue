<template>
  <IonCard
    class="active:scale-105 hover:scale-105 transition-all cursor-pointer h-min"
    :class="{ 'opacity-60': note }"
    @click="handleRoute(route, router, link)"
  >
    <NgrokImg v-if="image" :src="srcImage(image)" class="h-32 object-cover w-full" />
    <IonCardHeader :color="color" class="p-1">
      <IonCardTitle class="text-center text-2xl!">{{ title }}</IonCardTitle>
      <IonCardTitle v-if="subtitle" class="text-center text-xl!">{{ subtitle }}</IonCardTitle>
    </IonCardHeader>
    <IonCardContent v-if="note" class="py-1!">
      <IonTitle class="text-center text-xl!" color="tertiary">{{ note }}</IonTitle>
    </IonCardContent>
  </IonCard>
</template>

<script setup lang="ts">
/* Imports */
import { Color } from '@/types'
import handleRoute from '@/utils/handleRoute'
import srcImage from '@/utils/srcImage'
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonTitle } from '@ionic/vue'
import { useRoute, useRouter } from 'vue-router'
import NgrokImg from '../NgrokImg.vue'

/* Constants */
const route = useRoute()
const router = useRouter()

/* Props */
defineProps<{
  image: string
  link: string
  title: string
  color: Color
  subtitle?: string
  note?: string
}>()
</script>
