<template>
  <div class="wrap pt-4!">
    <!-- Subscription Modal -->
    <SubscriptionModal
      ref="modal"
      :title="translation(selectedSubscription?.product.name)"
      :active="selectedSubscription?.active"
      :submit="submitModal"
      @open:alert="alert.$el.present()"
    >
      <ProductPriceGrid v-if="selectedSubscription" v-model="newSubscription" :product="selectedSubscription.product" />
    </SubscriptionModal>

    <!-- Subscription Alert -->
    <IonAlert
      ref="alert"
      :header="translation('alert_header')"
      :message="translation('alert_message')"
      :buttons="[
        { text: translation('cancel'), role: 'cancel' },
        { text: translation('deactivate'), role: 'destructive', handler: alertSubmit, cssClass: 'bg-danger' },
      ]"
    />

    <!-- Active -->
    <ListGroupTitle :title="translation('active')" class="mb-3" />
    <IonList>
      <SubscriptionItem
        v-for="(subscription, key) in subscriptions.filter((sub) => sub.active)"
        :key
        :subscription
        @open:modal="openModal(subscription)"
      />
    </IonList>

    <!-- Inactive -->
    <ListGroupTitle :title="translation('inactive')" class="mb-3" />
    <IonList>
      <SubscriptionItem
        v-for="(subscription, key) in subscriptions.filter((sub) => !sub.active)"
        :key
        :subscription
        class="opacity-75"
        @open:modal="openModal(subscription)"
      />
    </IonList>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { Subscription } from '$/types'
import { useOrder } from '@/composables/order'
import { DraftOrder } from '@/types'
import translation from '@/utils/translation'
import { IonAlert, IonList } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import ProductPriceGrid from '../grids/ProductPriceGrid.vue'
import SubscriptionItem from '../ui/items/SubscriptionItem.vue'
import ListGroupTitle from '../ui/text/ListGroupTitle.vue'
import SubscriptionModal from './SubscriptionModal.vue'

/* Constants */
const { getSubscriptions, deactivateSubscription, modifySubscription } = useOrder()

/* Refs */
const subscriptions = ref<Subscription[]>([])
const modal = ref()
const selectedSubscription = ref<Subscription | undefined>(undefined)
const newSubscription = ref<DraftOrder | undefined>(undefined)
const alert = ref()

/* Lifecycle Hooks */
onMounted(async () => {
  getSubscriptions().then((result) => (subscriptions.value = result))
})

/* Functions */
function openModal(subscription: Subscription) {
  selectedSubscription.value = subscription
  modal.value.open()
}

async function submitModal() {
  if (!selectedSubscription.value || !newSubscription.value) {
    return
  }

  await modifySubscription(selectedSubscription.value.id, newSubscription.value)

  newSubscription.value = undefined
  selectedSubscription.value = undefined
  modal.value.close()
}

async function alertSubmit() {
  await deactivateSubscription(selectedSubscription.value!)
  alert.value.$el.dismiss()
  modal.value.close()
}
</script>
