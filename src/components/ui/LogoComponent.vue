<template>
  <RouterLink to="/home" class="inline-block">
    <IonImg
      :src="`https://cyna-it.fr/wp-content/themes/theme-cyna-it/images/logo-cyna${light ? '-white' : ''}.svg`"
      class="w-32"
    />
  </RouterLink>
</template>

<script setup lang="ts">
/* Imports */
import { IonImg } from '@ionic/vue'

/* Props */
defineProps<{
  light: boolean
}>()
</script>
