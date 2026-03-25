<template>
  <div class="flex flex-wrap gap-5 text-2xl">
    <a v-for="(social, key) in socials" :key :href="social.link" target="_blank">
      <IonIcon :icon="social.logo" />
    </a>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { Social } from '$/types'
import { IonIcon } from '@ionic/vue'

/* Props */
defineProps<{
  socials: Social[]
}>()
</script>
