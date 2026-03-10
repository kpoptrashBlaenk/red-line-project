<template>
  <div v-for="(order, key) in checkoutStore.orders" :key class="text-lg mb-2">
    <div class="font-bold col-span-3">{{ translation(order.product.name) }}</div>
    <div class="grid grid-cols-12 items-center">
      <div class="col-span-1">{{ order.amount }}x</div>
      <div class="col-span-4 text-end">{{ translation(order.users) }}</div>
      <div class="col-span-4 text-end">{{ translation(order.length) }}</div>
      <div class="font-bold col-span-3 text-end">
        {{ calculatePrice(order.product.price, order.length, order.users, order.amount) }}€
      </div>
    </div>
  </div>

  <div class="border-b border-gray-300 mb-2"></div>

  <div class="grid grid-cols-12 gap-2 justify-between text-lg">
    <div class="font-bold col-span-3">{{ translation('total') }}:</div>
    <div class="font-bold col-span-3 col-start-10 text-end">{{ checkoutStore.totalPrice }}€</div>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useCheckoutStore } from '@/stores/checkout'
import calculatePrice from '@/utils/calculatePrice'
import translation from '@/utils/translation'

/* Constants */
const checkoutStore = useCheckoutStore()
</script>
