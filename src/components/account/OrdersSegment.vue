<template>
  <div class="wrap pt-4!"></div>
</template>

<script setup lang="ts">
/* Imports */
import { Order } from '$/types'
import { useOrder } from '@/composables/order'
import { onMounted, ref } from 'vue'

/* Constants */
const { getOrders } = useOrder()

/* Refs */
const orders = ref<Order[]>([])

/* Lifecycle Hooks */
onMounted(async () => {
  orders.value = await getOrders()
})
</script>
