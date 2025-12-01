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
          :reorder-callback="promotionComposable.reorder"
          @open:modal-form="onModalOpen"
        />

        <!-- Home Text Accordion -->
        <AdminAccordionItem
          :title="translation('admin_home_text_title')"
          value="homeText"
          :items="homeText"
          text-key="text"
          :reorder-callback="homeTextComposable.reorder"
          @open:modal-form="onModalOpen"
        />

        <!-- Category Carousel Accordion -->
        <AdminAccordionItem
          :title="translation('admin_category_title')"
          value="category"
          :items="categories"
          image-key="image"
          text-key="name"
          :reorder-callback="categoryComposable.reorder"
          @open:modal-form="onModalOpen"
        />
      </IonAccordionGroup>

      <SeparatorComponent size="md" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Category, HomeText, Promotion } from '$/types'
import FormAlert from '@/components/forms/FormAlert.vue'
import FormModal from '@/components/forms/FormModal.vue'
import AdminPageGrid from '@/components/grids/AdminPageGrid.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import AdminAccordionItem from '@/components/ui/items/AdminAccordionItem.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { useCategory } from '@/composables/category'
import { useHomeText } from '@/composables/homeText'
import { usePromotion } from '@/composables/promotion'
import { AdminPageKey, AdminSectionKey } from '@/constants/adminPages'
import { ApiMethod } from '@/constants/apiMethod'
import { ApiHandlerItem, FormField } from '@/types'
import { categorySchema, categoryState, homeTextSchema, homeTextState, promotionSchema, promotionState } from '@/utils/schemas'
import translation from '@/utils/translation'
import { IonAccordionGroup } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import z from 'zod'

/* Constants */
const promotionComposable = usePromotion()
const homeTextComposable = useHomeText()
const categoryComposable = useCategory()

/* Form Refs */
const modal = ref()
const alert = ref()
const modalOpen = ref<boolean>(false)
const alertOpen = ref<boolean>(false)
const fields = ref<FormField[]>([])
const state = ref<any>({})
const schema = ref<z.ZodType<any>>()
const onSubmit = ref<(state?: any) => Promise<void>>(async () => {})

/* Refs */
const selectedPage = ref<AdminPageKey>('pages')
const promotions = ref<Promotion[]>([])
const homeText = ref<HomeText[]>([])
const categories = ref<Category[]>([])

/* Lifecycle Hooks */
onMounted(async () => {
  promotions.value = await promotionComposable.get()
  homeText.value = await homeTextComposable.get()
  categories.value = await categoryComposable.get()
})

/* Functions */
function onModalOpen(context: AdminSectionKey, method: ApiMethod, item?: any) {
  const contextItemMap = {
    promotion: { composable: promotionComposable, schema: promotionSchema(), defaultState: promotionState, ref: promotions },
    homeText: { composable: homeTextComposable, schema: homeTextSchema(), defaultState: homeTextState, ref: homeText },
    category: { composable: categoryComposable, schema: categorySchema(), defaultState: categoryState, ref: categories },
  }
  const contextItem = contextItemMap[context]

  const apiHandlerItem: ApiHandlerItem = {
    // create form fields
    fields: contextItem.composable.createFields(),
    // flatten item if it exists (prepare for modify), if not then create new state
    state: item ? { ...contextItem.composable.flatten(item) } : { ...contextItem.defaultState },
    // validation schema
    schema: contextItem.schema,
    // submit callback
    onSubmit: async (state?: any) => {
      // post
      if (method === 'post') contextItem.composable.create(state)
      // put
      else if (method === 'put') contextItem.composable.modify(item.id, state)
      // delete
      else if (method === 'delete') contextItem.composable.remove(item.id)

      // refetch and dismiss
      contextItem.ref.value = await contextItem.composable.get()
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
</script>
