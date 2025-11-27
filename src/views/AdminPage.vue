<template>
  <DefaultContentLayout>
    <!-- Admin Form Modal -->
    <FormModal :fields="fields.promotion" :state="promotionState" :schema="promotionSchema" @submit="onPromotionSubmit" />

    <!-- Hero Page Grid -->
    <HeroComponent>
      <AdminPageGrid />
    </HeroComponent>

    <div class="wrap">
      <SeparatorComponent size="xs" />

      <!-- Admin Home Accordions -->
      <IonAccordionGroup expand="inset" value="promotion">
        <!-- Promotion Carousel Accordion -->
        <AdminAccordionItem
          :title="translation('admin_home_carousel_title')"
          :value="'promotion'"
          :items="promotions"
          image-key="image"
          text-key="title"
          :reorder-callback="reorderPromotions"
        />
      </IonAccordionGroup>

      <SeparatorComponent size="md" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Promotion } from '$/types'
import FormModal from '@/components/forms/FormModal.vue'
import AdminPageGrid from '@/components/grids/AdminPageGrid.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import AdminAccordionItem from '@/components/ui/items/AdminAccordionItem.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { usePromotion } from '@/composables/promotion'
import { FormField } from '@/types'
import { promotionSchema, PromotionSchema, promotionState } from '@/utils/schemas'
import translation from '@/utils/translation'
import { IonAccordionGroup } from '@ionic/vue'
import { onMounted, reactive, ref } from 'vue'

/* Constants */
const { getPromotions, reorderPromotions } = usePromotion()

/* Refs */
const promotions = ref<Promotion[]>([])
const fields: { promotion: FormField[] } = reactive({ promotion: [{ element: 'ion-input', name: 'title', label: 'Title' }] })

/* Lifecycle Hooks */
onMounted(async () => {
  promotions.value = await getPromotions()
})

/* Functions */
function onPromotionSubmit(state: PromotionSchema) {
  console.log(state)
}
</script>
