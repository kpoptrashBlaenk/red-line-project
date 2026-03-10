<template>
  <IonAccordionGroup expand="inset">
    <IonAccordion v-for="(order, key) in checkoutStore.orders" :key :value="order.product.id.toString()" class="mt-2">
      <IonItem slot="header" color="light">
        <TitleComponent
          :text="`<title>${translation(order.product.name)}</title>`"
          color="primary"
          class="text-2xl! text-nowrap py-5"
        />
      </IonItem>

      <IonCard color="light" class="pb-5 lg:pb-0" slot="content">
        <IonCardContent>
          <ProductPriceGrid
            :product="order.product"
            :amount="order.amount"
            :length="order.length"
            :users="order.users"
            can-zero
            @update:model-value="updateOrders"
          />
        </IonCardContent>
      </IonCard>
    </IonAccordion>
  </IonAccordionGroup>
</template>

<script setup lang="ts">
/* Imports */
import { useCheckoutStore } from '@/stores/checkout'
import { DraftOrder } from '@/types'
import translation from '@/utils/translation'
import { IonAccordion, IonAccordionGroup, IonCard, IonCardContent, IonItem } from '@ionic/vue'
import ProductPriceGrid from '../grids/ProductPriceGrid.vue'
import TitleComponent from '../ui/text/TitleComponent.vue'

/* Constants */
const checkoutStore = useCheckoutStore()

/* Functions */
function updateOrders(order: DraftOrder) {
  checkoutStore.addOrder(order)
}
</script>
