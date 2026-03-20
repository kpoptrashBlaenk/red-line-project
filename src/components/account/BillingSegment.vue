<template>
  <div class="wrap pt-4!">
    <ListGroupTitle :title="translation('billing_information')" class="mb-3" />
    <IonAccordionGroup expand="inset" :value="['address', 'payment']" multiple class="mb-10">
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
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { Address, PaymentMethod } from '$/types'
import { useAddress } from '@/composables/address'
import { usePaymentMethod } from '@/composables/paymentMethod'
import { ApiMethod } from '@/constants/apiMethod'
import { ApiHandlerItem, ContextItem } from '@/types'
import { addressSchema, addressState, paymentMethodSchema, paymentMethodState } from '@/utils/schemas'
import translation from '@/utils/translation'
import { IonAccordionGroup } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import AdminAccordionItem from '../ui/items/AdminAccordionItem.vue'
import ListGroupTitle from '../ui/text/ListGroupTitle.vue'

/* Constants */
const addressComposable = useAddress()
const paymentMethodComposable = usePaymentMethod()

/* Refs */
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

/* Emits */
const emit = defineEmits(['update:formModal'])

/* Exposes */
defineExpose({ onRefresh })

/* Lifecycle Hook */
onMounted(async () => {
  onRefresh()
})

/* Functions */
async function onModalOpen(context: 'address' | 'payment', method: ApiMethod, item?: any) {
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
      if (method === 'post') await contextItem.composable.create?.(state)
      // put
      if (method === 'put') await contextItem.composable.modify?.(item.id, state)
      // delete
      if (method === 'delete') await contextItem.composable.remove?.(item.id)

      // refetch and dismiss
      contextItemMap.value[context].itemsRef = await contextItem.composable.get?.()
    },
  }

  // attribute variables
  emit('update:formModal', {
    fields: apiHandlerItem.fields,
    state: apiHandlerItem.state,
    schema: apiHandlerItem.schema,
    onSubmit: apiHandlerItem.onSubmit,
    method: method,
  })
}

async function onRefresh() {
  await Promise.all([
    addressComposable.get().then((data) => (addresses.value = data)),
    paymentMethodComposable.get().then((data) => (paymentMethods.value = data)),
  ])
}
</script>
