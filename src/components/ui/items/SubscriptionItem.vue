<template>
  <IonItem lines="none" color="tertiary" class="mb-4 rounded-2xl">
    <div class="p-4 w-full">
      <!-- Image & Name -->
      <div class="grid grid-cols-[100px_1fr] gap-5 items-center border-b-2 border-white pb-4">
        <IonImg :src="subscription.product.image[0]" class="object-contain" />
        <TitleComponent :text="translation(subscription.product.name)" class="text-2xl! text-left" />
      </div>

      <!-- Price & Length & Date -->
      <div class="border-b-2 border-white pb-4 pt-2">
        <div class="flex gap-2 items-baseline">
          <div class="text-lg font-extrabold">{{ subscription.price }}€</div>
          <div class="text-sm text-gray-300">/ {{ subscription.length }}</div>
        </div>
        <div class="text-sm text-gray-300">
          {{ translation('renews_on') }} {{ Intl.DateTimeFormat('fr-FR').format(new Date(subscription.renews_at)) }}
        </div>
      </div>

      <!-- Payment Method -->
      <div class="pt-2">
        <div class="text-sm">{{ subscription.payment_method.last4 }}</div>
        <div class="text-sm text-gray-300 -mt-1">{{ subscription.payment_method.expiration }}</div>
      </div>
    </div>
  </IonItem>
</template>

<script setup lang="ts">
/* Imports */
import { Order } from '$/types'
import translation from '@/utils/translation'
import { IonImg, IonItem } from '@ionic/vue'
import TitleComponent from '../text/TitleComponent.vue'

/* Props */
defineProps<{
  subscription: Order
}>()
</script>
