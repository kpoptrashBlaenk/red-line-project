<template>
  <IonButton
    fill="clear"
    :color="color"
    :type="form ? 'submit' : 'button'"
    :form
    @click="link ? handleRoute(route, router, link) : false"
  >
    {{ label }}
    <IonIcon v-if="chevron" :icon="chevronForward" class="ms-1" />
  </IonButton>
</template>

<script setup lang="ts">
/* Imports */
import { Color } from '@/types'
import handleRoute from '@/utils/handleRoute'
import { IonButton, IonIcon } from '@ionic/vue'
import { chevronForward } from 'ionicons/icons'
import { useRoute, useRouter } from 'vue-router'

/* Props */
defineProps<{
  label?: string
  link?: string
  color: Color
  chevron?: boolean
  form?: string
}>()

/* Constants */
const router = useRouter()
const route = useRoute()
</script>

<style lang="css" scoped>
/* MD Hover  */
ion-button[fill='clear'] {
  --background-hover-opacity: 0;
  --background-focused-opacity: 0;
}

/* Black Color */
ion-button[fill='clear']::part(native):hover,
ion-button[fill='clear']::part(native):focus,
ion-button[fill='clear']::part(native):active {
  color: var(--ion-color-dark);
}

/* IOS Hover */
@media (any-hover: hover) {
  ion-button[fill='clear']:hover {
    opacity: 1;
  }
}

/* Chevron Animation */
ion-button ion-icon {
  transition: all 0.2s;
}
ion-button:hover ion-icon,
ion-button:focus ion-icon,
ion-button:active ion-icon {
  transform: translateX(5px);
}
</style>
