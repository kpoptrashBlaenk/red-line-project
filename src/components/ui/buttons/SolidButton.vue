<template>
  <IonButton fill="solid" :color="color" :router-link="link" class="font-extrabold" :class="{ selected: selected }">
    {{ label }}
    <IonIcon v-if="icon" :icon class="ms-1" />
  </IonButton>
</template>

<script setup lang="ts">
/* Imports */
import { Color } from '@/types'
import { IonButton, IonIcon } from '@ionic/vue'

/* Props */
defineProps<{
  label: string
  link?: string
  color: Color
  icon?: string
  selected?: boolean
}>()
</script>

<style lang="css" scoped>
ion-button.button-solid {
  /* Border */
  --border-color: var(--ion-color-base);
  --border-style: solid;
  --border-width: 1px;

  /** Because IOS has a Tint & Shade layer */
  --ion-color-tint: trasparent !important;
  --ion-color-shade: trasparent !important;
}

/* Color Transition */
ion-button.button-solid::part(native) {
  transition: all 0.2s;
}

/* Inverse Colors on Interaction */
ion-button.button-solid::part(native):hover {
  background-color: var(--ion-color-contrast);
  color: var(--ion-color-base);
}

/* Inverse Colors On Default If Selected */
ion-button.button-solid.selected::part(native) {
  background-color: var(--ion-color-contrast);
  color: var(--ion-color-base);
}
</style>
