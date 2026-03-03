<template>
  <IonItem class="mb-10 px-2">
    <div class="w-full bg-light py-2 rounded-xl">
      <!-- Date & Open -->
      <div class="flex justify-between items-center border-primary border-b ps-4">
        <div class="text-sm text-tertiary font-bold">
          {{ formatDate(order.created_at) }}
        </div>
        <ClearButton :icon="openOutline" color="tertiary" class="mb-1 text-base! me-2" @click="$emit('open:modal', order)" />
      </div>

      <!-- Subscriptions -->
      <div
        v-for="(subscription, key) in order.subscriptions"
        :key
        class="ps-4 py-2"
        :class="{ 'border-t border-gray-300': key !== 0 }"
      >
        <!-- Name & Category & Status -->
        <div>
          <div class="flex justify-between items-center me-5">
            <TitleComponent
              :text="`<title>${translation(subscription.subscription.product.name)}</title>`"
              color="primary"
              class="text-2xl!"
            />
            <IonBadge
              :color="subscription.status === 'active' ? 'success' : subscription.status === 'renewed' ? 'warning' : 'danger'"
              class="text-sm px-1 mt-1 opacity-80 w-24"
              >{{ translation(subscription.status) }}</IonBadge
            >
          </div>
          <TitleComponent
            :text="`<title>${translation(subscription.subscription.product.category.name)}</title>`"
            color="secondary"
            class="text-lg! text-start"
          />
        </div>

        <!-- Price & Length -->
        <div class="flex gap-2 items-baseline text-tertiary">
          <div class="font-extrabold text-lg">{{ subscription.subscription.price }}€</div>
          <div class="text-sm opacity-75">/{{ translation(subscription.subscription.length) }}</div>
        </div>
      </div>

      <!-- Total -->
      <div class="flex gap-2 items-baseline border-primary border-t ps-4">
        <div class="text-lg font-bold">{{ translation('total') }}:</div>
        <TitleComponent :text="`<title>${order.price}€</title>`" color="primary" class="text-2xl!" />
      </div>
    </div>
  </IonItem>
</template>

<script setup lang="ts">
/* Imports */
import { Order } from '$/types'
import translation from '@/utils/translation'
import { IonBadge, IonItem } from '@ionic/vue'
import { openOutline } from 'ionicons/icons'
import ClearButton from '../buttons/ClearButton.vue'
import TitleComponent from '../text/TitleComponent.vue'
import formatDate from '@/utils/formatDate'

/* Props */
defineProps<{
  order: Order
}>()
</script>

<style lang="css" scoped>
ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}
</style>
