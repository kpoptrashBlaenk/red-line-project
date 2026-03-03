<template>
  <div class="wrap">
    <!-- Order Details Modal -->
    <OrderModal ref="modal" :order="selectedOrder" />

    <!-- Searchbar -->
    <IonSearchbar v-model="search" :placeholder="translation('search_order')" class="mb-5" />

    <!-- Orders -->
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
import translation from '@/utils/translation'
import { IonList, IonSearchbar } from '@ionic/vue'
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
const search = ref<string>('')

/* Computeds */
const filteredOrders = computed(() => {
  // init
  let processedOrders = orders.value

  // search
  processedOrders = processedOrders.filter((order) =>
    order.subscriptions.some((subscription) =>
      Object.values(subscription.subscription.product.name).some((name) =>
        name.toLowerCase().includes(search.value.toLowerCase()),
      ),
    ),
  )

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
})

/* Functions */
function openModal(order: Order) {
  selectedOrder.value = order
  modal.value?.$el.present()
}
</script>
