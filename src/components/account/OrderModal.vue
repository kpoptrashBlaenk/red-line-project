<template>
  <IonModal ref="modal">
    <IonHeader>
      <IonToolbar color="primary" class="px-5">
        <IonTitle>{{ translation('order_details') }}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <div v-if="order" class="p-5">
        <!-- Date & Address -->
        <div class="flex justify-between">
          <div class="text-gray-600">{{ formatDate(order.created_at) }}</div>
          <div class="flex flex-col text-right">
            <p>{{ order.address.first_name }} {{ order.address.last_name }}</p>
            <p>{{ order.address.street_address }}</p>
            <p>{{ order.address.locality }}</p>
            <p>{{ order.address.region }}</p>
            <p>{{ order.address.postal_code }}</p>
            <p>{{ order.address.country_code }}</p>
            <p>{{ order.address.prefix }} {{ order.address.phone }}</p>
          </div>
        </div>

        <div class="w-full border-b border-black my-5"></div>

        <!-- Subscriptions & Total -->

        <div class="text-xl text-medium mb-3 border-gray-400 border-b w-min">{{ translation('subscriptions') }}</div>
        <div v-for="(subscription, key) in order.subscriptions" :key class="text-lg border-b border-gray-300 pb-2 mb-2">
          <div class="font-bold col-span-3">{{ translation(subscription.subscription.product.name) }}</div>
          <div class="grid grid-cols-12 items-center">
            <div class="col-span-1">{{ subscription.subscription.amount }}x</div>
            <div class="col-span-4 text-end">{{ translation(subscription.subscription.users) }}</div>
            <div class="col-span-4 text-end">{{ translation(subscription.subscription.length) }}</div>
            <div class="font-bold col-span-3 text-end">{{ subscription.subscription.price }}€</div>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-2 justify-between text-lg mt-2">
          <div class="font-bold col-span-3">{{ translation('total') }}:</div>
          <div class="font-bold col-span-3 col-start-10 text-end">{{ order.price }}€</div>
        </div>

        <div class="w-full border-b border-black my-5"></div>

        <!-- Payment Method -->
        <div>
          <div class="text-xl text-medium mb-3 border-gray-400 border-b w-min text-nowrap">
            {{ translation('payment') }}
          </div>
          <div>
            <div>{{ order.payment_method.name }}</div>
            <div>{{ `**** **** **** ${order.payment_method.last4}` }}</div>
            <div>{{ order.payment_method.expiration }}</div>
          </div>
        </div>
      </div>
    </IonContent>

    <IonFooter>
      <IonToolbar color="light">
        <div class="flex">
          <ClearButton :label="translation('close')" color="dark" size="large" class="flex-1" @click="modal.$el.dismiss()" />
          <IonButton color="secondary" size="large" expand="block" class="flex-1" @click="order ? downloadOrder(order) : false">
            {{ translation('download') }}
            <IonIcon :icon="downloadOutline" class="ms-3 -mt-1" />
          </IonButton>
        </div>
      </IonToolbar>
    </IonFooter>
  </IonModal>
</template>

<script setup lang="ts">
/* Imports */
import { Order } from '$/types'
import { useOrder } from '@/composables/order'
import formatDate from '@/utils/formatDate'
import translation from '@/utils/translation'
import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from '@ionic/vue'
import { downloadOutline } from 'ionicons/icons'
import { ref } from 'vue'
import ClearButton from '../ui/buttons/ClearButton.vue'

/* Constants */
const { downloadOrder } = useOrder()

/* Props */
defineProps<{
  order?: Order
}>()

/* Refs */
const modal = ref()
</script>

<style lang="css" module>
ion-modal {
  --height: 90%;
  --width: 90%;
  --max-width: 1000px;
  --border-radius: 10px;
}
</style>
