<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('checkout')" />

    <div class="wrap">
      <SeparatorComponent size="sm" />

      <!-- Products Accordion -->
      <ListGroupTitle :title="translation('products')" />
      <CheckoutAccordion />

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
import CheckoutAccordion from '@/components/checkout/CheckoutAccordion.vue'
import CheckoutProductGrid from '@/components/grids/CheckoutProductGrid.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import SolidButton from '@/components/ui/buttons/SolidButton.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import ListGroupTitle from '@/components/ui/text/ListGroupTitle.vue'
import TitleComponent from '@/components/ui/text/TitleComponent.vue'
import { useCheckoutStore } from '@/stores/checkout'
import translation from '@/utils/translation'
import { IonCard, IonCardContent } from '@ionic/vue'

/* Constants */
const checkoutStore = useCheckoutStore()
</script>
