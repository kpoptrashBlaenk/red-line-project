<template>
  <DefaultContentLayout>
    <!-- Admin Form Modal -->
    <FormModal ref="modal" :is-open="modalOpen" :fields :state :schema @submit="onSubmit" />

    <!-- Admin Form Alert -->
    <FormAlert ref="alert" :is-open="alertOpen" @submit="onSubmit" />

    <!-- Hero Page Grid -->
    <HeroComponent>
      <AdminPageGrid :selected-page @update:selected-page="selectedPage = $event" />
    </HeroComponent>

    <div class="wrap">
      <SeparatorComponent size="xs" />

      <!-- Admin Page Content Accordions -->
      <IonAccordionGroup v-if="selectedPage === 'pages'" expand="inset">
        <!-- Promotion Carousel Accordion -->
        <AdminAccordionItem
          :title="translation('admin_home_carousel_title')"
          value="promotion"
          :items="promotions"
          image-key="image"
          text-key="title"
          note-key="subtitle"
          :reorder-callback="reorderPromotions"
          @open:modal-form="onModalOpen"
        />

        <!-- Category Carousel Accordion -->
        <AdminAccordionItem
          :title="translation('admin_category_title')"
          value="category"
          :items="categories"
          image-key="image"
          text-key="name"
          :reorder-callback="reorderCategories"
          @open:modal-form="onModalOpen"
        />
      </IonAccordionGroup>

      <SeparatorComponent size="md" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Category, Promotion } from '$/types'
import FormAlert from '@/components/forms/FormAlert.vue'
import FormModal from '@/components/forms/FormModal.vue'
import AdminPageGrid from '@/components/grids/AdminPageGrid.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import AdminAccordionItem from '@/components/ui/items/AdminAccordionItem.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { useCategory } from '@/composables/category'
import { usePromotion } from '@/composables/promotion'
import { AdminPageKey, AdminSectionKey } from '@/constants/adminPages'
import { ApiMethod } from '@/constants/apiMethod'
import { ApiHandlerItem, FormField } from '@/types'
import { categorySchema, CategorySchema, categoryState, promotionSchema, PromotionSchema, promotionState } from '@/utils/schemas'
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
const {
  createCategoryFields,
  flattenCategory,
  getCategories,
  reorderCategories,
  createCategory,
  modifyCategory,
  deleteCategory,
} = useCategory()

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
const selectedPage = ref<AdminPageKey>('pages')
const promotions = ref<Promotion[]>([])
const categories = ref<Category[]>([])

/* Lifecycle Hooks */
onMounted(async () => {
  promotions.value = await getPromotions()
  categories.value = await getCategories()
})

/* Functions */
function onModalOpen(context: AdminSectionKey, method: ApiMethod, item?: any) {
  let contextItem: ApiHandlerItem

  switch (context) {
    // promotion
    case 'promotion':
      contextItem = {
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
      }
      break

    // category
    case 'category':
      contextItem = {
        fields: createCategoryFields(),
        state: item ? { ...flattenCategory(item) } : { ...categoryState },
        schema: categorySchema(),
        onSubmit: (state?: CategorySchema) => {
          // delete
          if (method === 'delete') {
            deleteCategory(item.id)
            alert.value.$el.dismiss()
            return
          }

          // post & put
          method === 'post' ? createCategory(state as CategorySchema) : modifyCategory(item.id, state as CategorySchema)
          modal.value.$el.dismiss()
        },
      }
      break
  }

  // if not delete then form modal, otherwise alert
  method !== 'delete' ? modal.value.$el.present() : alert.value.$el.present()

  // attribute variables
  fields.value = contextItem.fields
  state.value = contextItem.state
  schema.value = contextItem.schema
  onSubmit.value = contextItem.onSubmit
}
</script>
