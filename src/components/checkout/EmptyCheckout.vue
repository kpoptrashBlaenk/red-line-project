<template>
  <div class="flex flex-col justify-center items-center gap-6 my-10">
    <IonIcon :icon="cartOutline" class="text-9xl text-primary" />
    <TitleComponent :text="`<title>${translation('empty_cart')}</title>`" color="tertiary" />
    <SolidButton :label="translation('add_products')" color="secondary" :link="'/products'" size="large" class="mt-5" />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import translation from '@/utils/translation'
import { IonIcon } from '@ionic/vue'
import { cartOutline } from 'ionicons/icons'
import SolidButton from '../ui/buttons/SolidButton.vue'
import TitleComponent from '../ui/text/TitleComponent.vue'
</script>
