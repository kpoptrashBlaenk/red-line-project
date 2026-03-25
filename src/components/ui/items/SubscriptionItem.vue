<template>
  <IonItem lines="none" color="tertiary" class="mb-4 rounded-2xl">
    <div class="py-3 px-0 w-full">
      <!-- Image & Name -->
      <div class="grid grid-cols-[100px_1fr] gap-5 items-center border-b-2 border-white pb-4">
        <IonImg :src="subscription.product.image[0]" class="object-contain" />
        <TitleComponent :text="translation(subscription.product.name)" class="text-xl! text-left" />
      </div>

      <!-- Price & Length & Date -->
      <div class="border-b-2 border-white py-2 flex justify-between items-center">
        <div>
          <div class="flex gap-2 items-baseline">
            <div class="text-lg font-extrabold">{{ subscription.price }}€</div>
            <div class="text-sm text-gray-300">/{{ translation(subscription.length) }}</div>
          </div>
          <div class="text-sm text-gray-300">{{ translation('renews_on') }} {{ formatDate(subscription.renews_at) }}</div>
        </div>

        <OutlineButton :icon="pencilOutline" color="light" class="h-10" @click="$emit('open:modal')" />
      </div>

      <!-- Payment Method -->
      <div class="pt-2">
        <div class="text-sm">{{ `**** **** **** ${subscription.payment_method.last4}` }}</div>
        <div class="text-sm text-gray-300 -mt-1">{{ subscription.payment_method.expiration }}</div>
      </div>
    </div>
  </IonItem>
</template>

<script setup lang="ts">
/* Imports */
import { Subscription } from '$/types'
import formatDate from '@/utils/formatDate'
import translation from '@/utils/translation'
import { IonImg, IonItem } from '@ionic/vue'
import { pencilOutline } from 'ionicons/icons'
import OutlineButton from '../buttons/OutlineButton.vue'
import TitleComponent from '../text/TitleComponent.vue'

/* Props */
defineProps<{
  subscription: Subscription
}>()
</script>
