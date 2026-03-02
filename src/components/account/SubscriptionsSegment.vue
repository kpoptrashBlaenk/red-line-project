<template>
  <div class="wrap pt-4!">
    <!-- Active -->
    <ListGroupTitle :title="translation('active')" class="mb-3" />
    <IonList>
      <SubscriptionItem v-for="(subscription, key) in subscriptions.filter((sub) => sub.active)" :key :subscription />
    </IonList>

    <!-- Inactive -->
    <ListGroupTitle :title="translation('inactive')" class="mb-3" />
    <IonList>
      <SubscriptionItem
        v-for="(subscription, key) in subscriptions.filter((sub) => !sub.active)"
        :key
        :subscription
        class="opacity-75"
      />
    </IonList>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { Order } from '$/types'
import { useOrder } from '@/composables/order'
import translation from '@/utils/translation'
import { IonList } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import SubscriptionItem from '../ui/items/SubscriptionItem.vue'
import ListGroupTitle from '../ui/text/ListGroupTitle.vue'

/* Constants */
const { getSubscriptions } = useOrder()

/* Refs */
const subscriptions = ref<Order[]>([])

/* Lifecycle Hooks */
onMounted(async () => {
  subscriptions.value = await getSubscriptions()
})
</script>
