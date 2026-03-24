<template>
  <div class="wrap pt-4!">
    <!-- Subscription Modal -->
    <SubscriptionModal
      ref="modal"
      :title="translation(selectedSubscription?.product.name)"
      :active="selectedSubscription?.active"
      :submit="submitModal"
      @open:alert="alert.$el.present()"
    />

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
      <!-- Skeleton -->
      <SubscriptionItemSkeleton v-if="!subscriptions || subscriptions.length === 0" />

      <!-- Items -->
      <SubscriptionItem
        v-else
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
import translation from '@/utils/translation'
import { IonAlert, IonList } from '@ionic/vue'
import { ref } from 'vue'
import SubscriptionItemSkeleton from '../skeletons/SubscriptionItemSkeleton.vue'
import SubscriptionItem from '../ui/items/SubscriptionItem.vue'
import ListGroupTitle from '../ui/text/ListGroupTitle.vue'
import SubscriptionModal from './SubscriptionModal.vue'

/* Constants */
const { getSubscriptions, deactivateSubscription, reactivateSubscription } = useOrder()

/* Refs */
const subscriptions = ref<Subscription[]>([])
const modal = ref()
const selectedSubscription = ref<Subscription | undefined>(undefined)
const alert = ref()

/* Exposes */
defineExpose({ onRefresh })

/* Functions */
function openModal(subscription: Subscription) {
  selectedSubscription.value = subscription
  modal.value.open()
}

async function submitModal() {
  if (!selectedSubscription.value) {
    return
  }

  reactivateSubscription(selectedSubscription.value.id)

  selectedSubscription.value = undefined
  modal.value.close()
}

async function alertSubmit() {
  await deactivateSubscription(selectedSubscription.value!)
  alert.value.$el.dismiss()
  modal.value.close()
}

async function onRefresh() {
  subscriptions.value = await getSubscriptions()
}
</script>
