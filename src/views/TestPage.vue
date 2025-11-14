<template>
  <IonContent>
    <ButtonComponent :props />
  </IonContent>
</template>

<script setup lang="ts">
/* Imports */
import ButtonComponent from '@/components/ui/ButtonComponent.vue'
import { ButtonProps } from '@/types'
import { IonContent } from '@ionic/vue'
import { chevronForward } from 'ionicons/icons'

const props: ButtonProps = {
  label: 'Click Me',
  color: 'primary',
  fill: 'solid',
  icon: chevronForward,
}
</script>
