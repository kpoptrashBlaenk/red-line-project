<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('account')" />

    <div class="wrap">
      <!-- Account Form Modal -->
      <FormModal ref="modal" :is-open="modalOpen" :fields :state :schema @submit="onSubmit" @did-dismiss="modalOpen = false" />

      <!-- Account Form Alert -->
      <FormAlert ref="alert" @submit="onSubmit" />

      <SeparatorComponent size="xs" />

      <!-- Account List -->
      <AccountList :on-modal-open="onModalOpen" />

      <!-- Payment Information -->
      <ListGroupTitle :title="'Payment Information'" />
      <IonAccordionGroup expand="inset" class="mb-10">
        <AdminAccordionItem
          v-for="(item, key) in Object.values(contextItemMap)"
          :key
          :title="item.title"
          :value="item.value"
          :items="item.itemsRef"
          :image="item.image"
          :text="item.text"
          :note="item.note"
          :add="item.add"
          :modify="item.modify"
          :remove="item.remove"
          @open:modal-form="onModalOpen"
        />
      </IonAccordionGroup>

      <!-- Account Delete -->
      <SolidButton
        :icon="alertCircleOutline"
        :label="translation('delete')"
        color="danger"
        size="large"
        expand="block"
        @click="setDeleteUserSubmit"
      />

      <SeparatorComponent size="sm" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Address, PaymentMethod } from '$/types'
import FormAlert from '@/components/forms/FormAlert.vue'
import FormModal from '@/components/forms/FormModal.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import SolidButton from '@/components/ui/buttons/SolidButton.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import AccountList from '@/components/ui/items/AccountList.vue'
import AdminAccordionItem from '@/components/ui/items/AdminAccordionItem.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import ListGroupTitle from '@/components/ui/text/ListGroupTitle.vue'
import { useAddress } from '@/composables/address'
import { useAuth } from '@/composables/auth'
import { usePaymentMethod } from '@/composables/paymentMethod'
import { ApiMethod } from '@/constants/apiMethod'
import { useUserStore } from '@/stores/user'
import { ApiHandlerItem, ContextItem, FormField } from '@/types'
import { addressSchema, addressState, paymentMethodSchema, paymentMethodState } from '@/utils/schemas'
import translation from '@/utils/translation'
import { IonAccordionGroup } from '@ionic/vue'
import { alertCircleOutline } from 'ionicons/icons'
import { onMounted, ref } from 'vue'
import { ZodType } from 'zod'

/* Constants */
const { deleteUser } = useAuth()
const userStore = useUserStore()
const addressComposable = useAddress()
const paymentMethodComposable = usePaymentMethod()

/* Refs */
const alert = ref()
const modal = ref()
const modalOpen = ref<boolean>(false)
const fields = ref<FormField[]>([])
const state = ref<any>({})
const schema = ref<ZodType<any>>()
const onSubmit = ref<(state?: any) => Promise<void>>(async () => {})
const addresses = ref<Address[]>([])
const paymentMethods = ref<PaymentMethod[]>([])
const contextItemMap = ref<Record<'address' | 'payment', ContextItem<Address> | ContextItem<PaymentMethod>>>({
  address: {
    title: translation('addresses'),
    value: 'address',
    itemsRef: addresses,
    text: (item: Address) => item.street_address,
    note: (item: Address) => item.locality,
    add: true,
    modify: true,
    remove: true,
    composable: addressComposable,
    schema: addressSchema(),
    defaultState: addressState,
  },
  payment: {
    title: translation('payment_methods'),
    value: 'payment',
    itemsRef: paymentMethods,
    text: (item: PaymentMethod) => item.last4.toString(),
    note: (item: PaymentMethod) => item.expiration,
    add: true,
    remove: true,
    composable: paymentMethodComposable,
    schema: paymentMethodSchema(),
    defaultState: paymentMethodState,
  },
})

/* Lifecycle Hook */
onMounted(async () => {
  addressComposable.get().then((data) => (addresses.value = data))
  paymentMethodComposable.get().then((data) => (paymentMethods.value = data))
})

/* Functions */
async function onModalOpen(context?: 'address' | 'payment', method?: ApiMethod, item?: any) {
  // normal item not in accordion
  if (!context && !method && item) {
    fields.value = item.fields
    state.value = userStore.user
    schema.value = item.schema
    onSubmit.value = async (state: any) => {
      await item.onSubmit(state)
      modal.value.$el.dismiss()
    }
    modalOpen.value = true

    return
  }

  // accordion items
  if (context && method) {
    const contextItem = contextItemMap.value[context]

    const apiHandlerItem: ApiHandlerItem = {
      // create form fields
      fields: (await contextItem.composable.createFields?.()) ?? [],
      // flatten item if it exists (prepare for modify), if not then create new state
      state: item ?? { ...contextItem.defaultState },
      // validation schema
      schema: contextItem.schema,
      // submit callback
      onSubmit: async (state?: any) => {
        // post
        if (method === 'post') contextItem.composable.create?.(state)
        // put
        if (method === 'put') contextItem.composable.modify?.(item.id, state)
        // delete
        if (method === 'delete') contextItem.composable.remove?.(item.id)

        // refetch and dismiss
        contextItem.itemsRef.value = await contextItem.composable.get?.()
        modal.value.$el.dismiss()
        alert.value.$el.dismiss()
      },
    }

    // if not delete then form modal, otherwise alert
    method !== 'delete' ? modal.value.$el.present() : alert.value.$el.present()

    // attribute variables
    fields.value = apiHandlerItem.fields
    state.value = apiHandlerItem.state
    schema.value = apiHandlerItem.schema
    onSubmit.value = apiHandlerItem.onSubmit
  }
}

function setDeleteUserSubmit() {
  alert.value.$el.present()

  onSubmit.value = async () => {
    await deleteUser()
    location.reload()
  }
}
</script>

<style lang="css" scoped>
ion-item {
  --detail-icon-color: white;
  --detail-icon-opacity: 1;
  --detail-icon-font-size: 32px;
}
</style>
