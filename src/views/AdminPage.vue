<template>
  <DefaultContentLayout>
    <!-- Admin Form Modal -->
    <FormModal ref="modal" :is-open="modalOpen" :fields :state :schema @submit="onSubmit" />

    <!-- Admin Form Alert -->
    <FormAlert ref="alert" :is-open="alertOpen" @submit="onSubmit" />

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
          note-key="subtitle"
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
import FormAlert from '@/components/forms/FormAlert.vue'
import FormModal from '@/components/forms/FormModal.vue'
import AdminPageGrid from '@/components/grids/AdminPageGrid.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import AdminAccordionItem from '@/components/ui/items/AdminAccordionItem.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { usePromotion } from '@/composables/promotion'
import { ApiHandlerItem, FormField } from '@/types'
import { promotionSchema, PromotionSchema, promotionState } from '@/utils/schemas'
import translation from '@/utils/translation'
import { IonAccordionGroup } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import z from 'zod'

/* Constants */
const {
  createPromotionFields,
  flattenPromotion,
  getPromotions,
  reorderPromotions,
  createPromotion,
  modifyPromotion,
  deletePromotion,
} = usePromotion()

/* Form Refs */
const modal = ref()
const alert = ref()
const modalOpen = ref<boolean>(false)
const alertOpen = ref<boolean>(false)
const fields = ref<FormField[]>([])
const state = ref<any>({})
const schema = ref<z.ZodType<any>>()
const onSubmit = ref<(state?: any) => void>(() => {})

/* Refs */
const promotions = ref<Promotion[]>([])

/* Lifecycle Hooks */
onMounted(async () => {
  promotions.value = await getPromotions()
})

/* Functions */
function onModalOpen(context: 'promotion', method: 'post' | 'put' | 'delete', item?: any) {
  const items: ApiHandlerItem = {
    // promotion
    promotion: {
      fields: createPromotionFields(),
      state: item ? { ...flattenPromotion(item) } : { ...promotionState },
      schema: promotionSchema(),
      onSubmit: (state?: PromotionSchema) => {
        // delete
        if (method === 'delete') {
          deletePromotion(item.id)
          alert.value.$el.dismiss()
          return
        }

        // post & put
        method === 'post' ? createPromotion(state as PromotionSchema) : modifyPromotion(item.id, state as PromotionSchema)
        modal.value.$el.dismiss()
      },
    },
  }

  // if not delete then form modal, otherwise alert
  method !== 'delete' ? modal.value.$el.present() : alert.value.$el.present()

  // attribute variables
  fields.value = items[context].fields
  state.value = items[context].state
  schema.value = items[context].schema
  onSubmit.value = items[context].onSubmit
}
</script>
