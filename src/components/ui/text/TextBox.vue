<template>
  <div v-for="(text, key) in homeText" :key class="flex items-center gap-5 bg-light p-5">
    <IonIcon :icon="informationCircleOutline" class="text-9xl" />
    {{ translation(text.text) }}
  </div>
</template>

<script setup lang="ts">
import { HomeText } from '$/types'
import translation from '@/utils/translation'
import { IonIcon } from '@ionic/vue'
import { informationCircleOutline } from 'ionicons/icons'

/* Props */
defineProps<{
  homeText: HomeText[]
}>()
</script>
