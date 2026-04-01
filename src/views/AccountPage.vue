<template>
  <DefaultContentLayout :on-refresh>
    <HeroComponent :title="translation('account')" />

    <!-- Account Form Modal -->
    <FormModal ref="modal" :is-open="modalOpen" :fields :state :schema @submit="onSubmit" @did-dismiss="modalOpen = false" />

    <!-- Account Form Alert -->
    <FormAlert ref="alert" @submit="onSubmit" />

    <!-- Segment Buttons -->
    <IonSegment v-model="activeSegment" scrollable class="min-h-16 scrollbar-none">
      <IonSegmentButton value="profile" content-id="profile-content" class="segment-primary">
        <IonLabel class="text-lg">{{ translation('profile') }}</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="billing" content-id="billing-content" class="segment-secondary">
        <IonLabel class="text-lg">{{ translation('billing') }}</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="subscriptions" content-id="subscriptions-content" class="segment-tertiary">
        <IonLabel class="text-lg">{{ 'subscriptions' }}</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="orders" content-id="orders-content" class="segment-primary">
        <IonLabel class="text-lg">{{ 'orders' }}</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="danger" content-id="danger-content" class="segment-danger">
        <IonLabel class="text-lg">{{ translation('danger') }}</IonLabel>
      </IonSegmentButton>
    </IonSegment>

    <!-- Segment View -->
    <IonSegmentView class="min-h-fit">
      <!-- Profile -->
      <IonSegmentContent id="profile-content">
        <ProfileSegment @update:form-modal="updateFormModalProfile($event)" />
      </IonSegmentContent>

      <!-- Billing -->
      <IonSegmentContent id="billing-content">
        <BillingSegment ref="billingSegment" @update:form-modal="updateFormModalBilling($event)" />
      </IonSegmentContent>

      <!-- Subscriptions -->
      <IonSegmentContent id="subscriptions-content">
        <SubscriptionsSegment ref="subscriptionsSegment" />
      </IonSegmentContent>

      <!-- Orders -->
      <IonSegmentContent id="orders-content">
        <OrdersSegment ref="ordersSegment" />
      </IonSegmentContent>

      <!-- Danger -->
      <IonSegmentContent id="danger-content">
        <DangerSegment @delete:account="deleteAccount" />
      </IonSegmentContent>
    </IonSegmentView>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import BillingSegment from '@/components/account/BillingSegment.vue'
import DangerSegment from '@/components/account/DangerSegment.vue'
import OrdersSegment from '@/components/account/OrdersSegment.vue'
import ProfileSegment from '@/components/account/ProfileSegment.vue'
import SubscriptionsSegment from '@/components/account/SubscriptionsSegment.vue'
import FormAlert from '@/components/forms/FormAlert.vue'
import FormModal from '@/components/forms/FormModal.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import { ApiMethod } from '@/constants/apiMethod'
import { AccountItem, FormField } from '@/types'
import translation from '@/utils/translation'
import { IonLabel, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, RefresherCustomEvent } from '@ionic/vue'
import { ref, useTemplateRef, watch } from 'vue'
import { ZodType } from 'zod'

/* Refs */
const alert = ref()
const modal = ref()
const modalOpen = ref<boolean>(false)
const fields = ref<FormField[]>([])
const state = ref<any>({})
const schema = ref<ZodType<any>>()
const onSubmit = ref<(state?: any) => Promise<void>>(async () => {})
const billingSegment = useTemplateRef('billingSegment')
const subscriptionsSegment = useTemplateRef('subscriptionsSegment')
const ordersSegment = useTemplateRef('ordersSegment')
const activeSegment = ref<string>('profile')
const onRefresh = ref<((event?: RefresherCustomEvent) => Promise<void>) | undefined>(undefined)

/* Watches */
watch(activeSegment, async (segment) => {
  switch (segment) {
    case 'billing':
      onRefresh.value = async (event?: RefresherCustomEvent) => {
        await billingSegment.value?.onRefresh()
        event?.target.complete()
      }
      break
    case 'subscriptions':
      onRefresh.value = async (event?: RefresherCustomEvent) => {
        await subscriptionsSegment.value?.onRefresh()
        event?.target.complete()
      }
      break
    case 'orders':
      onRefresh.value = async (event?: RefresherCustomEvent) => {
        await ordersSegment.value?.onRefresh()
        event?.target.complete()
      }
      break
    default:
      onRefresh.value = undefined
  }

  onRefresh.value?.()
})

/* Functions */
function updateFormModalBilling(event: {
  fields: FormField[]
  state: any
  schema: ZodType<any>
  onSubmit: (state?: AccountItem) => Promise<void>
  method: ApiMethod
}) {
  fields.value = event.fields
  state.value = event.state
  schema.value = event.schema
  onSubmit.value = async (state?: AccountItem) => {
    await event.onSubmit(state)
    modal.value.$el.dismiss()
    alert.value.$el.dismiss()
  }

  event.method !== 'delete' ? modal.value.$el.present() : alert.value.$el.present()
}

function updateFormModalProfile(event: {
  fields: FormField[]
  state: any
  schema: ZodType<any>
  onSubmit: (state?: AccountItem) => Promise<void>
}) {
  fields.value = event.fields
  state.value = event.state
  schema.value = event.schema
  onSubmit.value = async (state?: AccountItem) => {
    await event.onSubmit(state)
    modal.value.$el.dismiss()
  }
  modalOpen.value = true
}

function deleteAccount(event: () => Promise<void>) {
  alert.value.$el.present()

  onSubmit.value = event
}
</script>

<style lang="css" scoped>
ion-item {
  --detail-icon-color: white;
  --detail-icon-opacity: 1;
  --detail-icon-font-size: 32px;
}

ion-segment-button.segment-primary {
  --color-checked: var(--ion-color-primary);
}
ion-segment-button.segment-secondary {
  --color-checked: var(--ion-color-secondary);
}
ion-segment-button.segment-tertiary {
  --color-checked: var(--ion-color-tertiary);
}
ion-segment-button.segment-danger {
  --color-checked: var(--ion-color-danger);
}
</style>
