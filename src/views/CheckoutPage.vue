<template>
  <DefaultContentLayout>
    <!-- Form Modal -->
    <FormModal ref="modal" :is-open="modalOpen" :fields :state :schema @submit="onSubmit" @did-dismiss="modalOpen = false" />

    <!-- Hero -->
    <HeroComponent :title="translation('checkout')" />

    <div class="wrap">
      <SeparatorComponent size="sm" />

      <!-- Products Accordion -->
      <ListGroupTitle :title="translation('products')" />
      <CheckoutAccordion />

      <!-- Address -->
      <ListGroupTitle :title="translation('address')" class="mt-5" />
      <AddressForm :addresses @on-modal-open="onModalOpen('address')" />

      <!-- Address -->
      <ListGroupTitle :title="translation('payment_method')" class="mt-5" />
      <PaymentMethodForm :payment-methods @on-modal-open="onModalOpen('payment')" />

      <div class="border-b-2 border-gray-300 mt-5 mb-3"></div>

      <!-- Total Price -->
      <IonCard color="light">
        <IonCardContent>
          <CheckoutProductGrid />
        </IonCardContent>
      </IonCard>

      <!-- Pay Button -->
      <div class="flex gap-5 items-center mt-5">
        <TitleComponent :text="'<title>Total:</title>'" color="tertiary" class="text-3xl!" />
        <TitleComponent :text="`<title>${checkoutStore.totalPrice}€</title>`" color="primary" />
        <SolidButton color="primary" :label="'Pay'" class="text-3xl w-full" />
      </div>

      <SeparatorComponent size="sm" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Address, PaymentMethod } from '$/types'
import AddressForm from '@/components/checkout/AddressForm.vue'
import CheckoutAccordion from '@/components/checkout/CheckoutAccordion.vue'
import PaymentMethodForm from '@/components/checkout/PaymentMethodForm.vue'
import FormModal from '@/components/forms/FormModal.vue'
import CheckoutProductGrid from '@/components/grids/CheckoutProductGrid.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import SolidButton from '@/components/ui/buttons/SolidButton.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import ListGroupTitle from '@/components/ui/text/ListGroupTitle.vue'
import TitleComponent from '@/components/ui/text/TitleComponent.vue'
import { useAddress } from '@/composables/address'
import { usePaymentMethod } from '@/composables/paymentMethod'
import { useCheckoutStore } from '@/stores/checkout'
import { ApiHandlerItem, ContextItem, FormField } from '@/types'
import { addressSchema, addressState, paymentMethodSchema, paymentMethodState } from '@/utils/schemas'
import translation from '@/utils/translation'
import { IonCard, IonCardContent } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import { ZodType } from 'zod'

/* Constants */
const checkoutStore = useCheckoutStore()
const paymentMethodComposable = usePaymentMethod()
const addressComposable = useAddress()

/* Refs */
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
    add: true,
    composable: addressComposable,
    schema: addressSchema(),
    defaultState: addressState,
  },
  payment: {
    title: translation('payment_methods'),
    value: 'payment',
    itemsRef: paymentMethods,
    add: true,
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
async function onModalOpen(context: 'address' | 'payment') {
  const contextItem = contextItemMap.value[context]

  const apiHandlerItem: ApiHandlerItem = {
    // create form fields
    fields: (await contextItem.composable.createFields?.()) ?? [],
    // flatten item if it exists (prepare for modify), if not then create new state
    state: { ...contextItem.defaultState },
    // validation schema
    schema: contextItem.schema,
    // submit callback
    onSubmit: async (state?: any) => {
      // post
      contextItem.composable.create?.(state)

      // refetch and dismiss
      contextItem.itemsRef.value = await contextItem.composable.get?.()
      modal.value.$el.dismiss()
    },
  }

  modal.value.$el.present()

  // attribute variables
  fields.value = apiHandlerItem.fields
  state.value = apiHandlerItem.state
  schema.value = apiHandlerItem.schema
  onSubmit.value = apiHandlerItem.onSubmit
}
</script>
