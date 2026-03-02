<template>
  <div class="wrap pt-4!">
    <OrderModal ref="modal" :order="selectedOrder" />

    <div v-for="(orders, year) in filteredOrders" :key="year">
      <ListGroupTitle :title="`${Number(year) * -1}`" class="mb-3" />
      <IonList lines="none">
        <OrderItem v-for="(order, key) in orders" :key :order @open:modal="openModal" />
      </IonList>
    </div>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { Order } from '$/types'
import { useOrder } from '@/composables/order'
import { IonList } from '@ionic/vue'
import { computed, onMounted, ref } from 'vue'
import OrderItem from '../ui/items/OrderItem.vue'
import ListGroupTitle from '../ui/text/ListGroupTitle.vue'
import OrderModal from './OrderModal.vue'

/* Constants */
const { getOrders } = useOrder()

/* Refs */
const orders = ref<Order[]>([])
const modal = ref()
const selectedOrder = ref<Order>()

/* Computeds */
const filteredOrders = computed(() => {
  let processedOrders = orders.value

  // group by year
  const groupedOrders: Record<number, Order[]> = {}

  processedOrders.forEach((order) => {
    const year = -new Date(order.created_at).getFullYear() // - to reverse order, then * -1 in title

    if (!groupedOrders[year]) {
      groupedOrders[year] = []
    }
    groupedOrders[year].push(order)
  })

  return groupedOrders
})

/* Lifecycle Hooks */
onMounted(async () => {
  orders.value = await getOrders()
  modal.value?.$el.present()
})

/* Functions */
function openModal(order: Order) {
  selectedOrder.value = order
  modal.value?.$el.present()
}
</script>
