<template>
  <DefaultContentLayout>
    <!-- Admin Form Modal -->
    <FormModal ref="modal" :is-open="modalOpen" :fields :state :schema @submit="onSubmit" />

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
          @open:modal-form="onModalOpen"
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
import { onMounted, ref } from 'vue'
import z from 'zod'

/* Constants */
const { createPromotionFields, flattenPromotion, getPromotions, reorderPromotions, createPromotion, modifyPromotion } =
  usePromotion()

/* Form Refs */
const modal = ref()
const modalOpen = ref<boolean>(false)
const fields = ref<FormField[]>([])
const state = ref<any>({})
const schema = ref<z.ZodType<any>>()
const onSubmit = ref<(state: any, dismiss: () => void) => void>(() => {})

/* Refs */
const promotions = ref<Promotion[]>([])

/* Lifecycle Hooks */
onMounted(async () => {
  promotions.value = await getPromotions()
})

/* Functions */
function onModalOpen(context: 'promotion', item?: any) {
  const items = {
    // promotion
    promotion: {
      fields: createPromotionFields(),
      state: item ? { ...flattenPromotion(item) } : { ...promotionState },
      schema: promotionSchema(),
      onSubmit: (state: PromotionSchema, dismiss: () => void) => {
        item ? modifyPromotion(state) : createPromotion(state)
        dismiss()
      },
    },
  }

  modal.value.$el.present()

  fields.value = items[context].fields
  state.value = items[context].state
  schema.value = items[context].schema
  onSubmit.value = items[context].onSubmit
}
</script>
