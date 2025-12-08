<template>
  <div class="wrap">
    <!-- Admin Form Modal -->
    <FormModal ref="modal" :is-open="modalOpen" :fields :state :schema @submit="onSubmit" />

    <!-- Admin Form Alert -->
    <FormAlert ref="alert" :is-open="alertOpen" @submit="onSubmit" />

    <SeparatorComponent size="xs" />

    <!-- Content Accordions -->
    <IonAccordionGroup expand="inset">
      <AdminAccordionItem
        v-for="(item, key) in Object.values(contextItemMap)"
        :key
        :title="item.title"
        :value="item.value"
        :items="item.itemsRef"
        :image="item.image"
        :text="item.text"
        :note="item.note"
        :reorder="item.reorder"
        :add="item.add"
        :modify="item.modify"
        :remove="item.remove"
        :reorder-callback="item.reorderCallback"
        @open:modal-form="onModalOpen"
      />
    </IonAccordionGroup>

    <SeparatorComponent size="md" />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { Category, Characteristic, HomeText, Product, Promotion } from '$/types'
import FormAlert from '@/components/forms/FormAlert.vue'
import FormModal from '@/components/forms/FormModal.vue'
import AdminAccordionItem from '@/components/ui/items/AdminAccordionItem.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { useCategory } from '@/composables/category'
import { useCharacteristic } from '@/composables/characteristic'
import { useHomeText } from '@/composables/homeText'
import { useProduct } from '@/composables/product'
import { usePromotion } from '@/composables/promotion'
import { AdminSectionKey } from '@/constants/adminPages'
import { ApiMethod } from '@/constants/apiMethod'
import { ApiHandlerItem, ContextItem, FormField } from '@/types'
import {
  categorySchema,
  categoryState,
  characteristicSchema,
  characteristicsState,
  homeTextSchema,
  homeTextState,
  productSchema,
  productState,
  promotionSchema,
  promotionState,
} from '@/utils/schemas'
import translation from '@/utils/translation'
import { IonAccordionGroup } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import z from 'zod'

/* Constants */
const promotionComposable = usePromotion()
const homeTextComposable = useHomeText()
const categoryComposable = useCategory()
const productComposable = useProduct()
const characteristicComposable = useCharacteristic()

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
const promotions = ref<Promotion[]>([])
const homeText = ref<HomeText[]>([])
const categories = ref<Category[]>([])
const products = ref<Product[]>([])
const characteristics = ref<Characteristic[]>([])
const contextItemMap = ref<ContextItem>({
  promotion: {
    title: translation('admin_home_carousel_title'),
    value: 'promotion',
    itemsRef: promotions,
    image: (item: Promotion) => item.image,
    text: (item: Promotion) => translation(item.title),
    note: (item: Promotion) => translation(item.subtitle),
    reorder: true,
    add: true,
    modify: true,
    remove: true,
    reorderCallback: promotionComposable.reorder,
    composable: promotionComposable,
    schema: promotionSchema(),
    defaultState: promotionState,
    ref: promotions,
  },
  homeText: {
    title: translation('admin_home_text_title'),
    value: 'homeText',
    itemsRef: homeText,
    text: (item: HomeText) => translation(item.text),
    modify: true,
    composable: homeTextComposable,
    schema: homeTextSchema(),
    defaultState: homeTextState,
    ref: homeText,
  },
  category: {
    title: translation('admin_category_title'),
    value: 'category',
    itemsRef: categories,
    image: (item: Category) => item.image,
    text: (item: Category) => translation(item.name),
    reorder: true,
    add: true,
    modify: true,
    remove: true,
    reorderCallback: categoryComposable.reorder,
    composable: categoryComposable,
    schema: categorySchema(),
    defaultState: categoryState,
    ref: categories,
  },
  product: {
    title: translation('admin_product_title'),
    value: 'product',
    itemsRef: products,
    image: (item: Product) => item.image,
    text: (item: Product) => translation(item.name),
    note: (item: Product) => translation(item.description_functionality),
    reorder: true,
    add: true,
    modify: true,
    remove: true,
    reorderCallback: productComposable.reorder,
    composable: productComposable,
    schema: productSchema(),
    defaultState: productState,
    ref: products,
  },
  characteristic: {
    title: translation('admin_characteristic_title'),
    value: 'characteristic',
    itemsRef: characteristics,
    text: (item: Characteristic) => translation(item.name),
    note: (item: Characteristic) => translation(item.type),
    add: true,
    modify: true,
    remove: true,
    composable: characteristicComposable,
    schema: characteristicSchema(),
    defaultState: characteristicsState,
    ref: characteristics,
  },
})

/* Lifecycle Hooks */
onMounted(async () => {
  promotions.value = await promotionComposable.get()
  homeText.value = await homeTextComposable.get()
  categories.value = await categoryComposable.get()
  products.value = await productComposable.get()
  characteristics.value = await characteristicComposable.get()
})

/* Functions */
async function onModalOpen(context: AdminSectionKey, method: ApiMethod, item?: any) {
  const contextItem = contextItemMap.value[context]

  const apiHandlerItem: ApiHandlerItem = {
    // create form fields
    fields: (await contextItem.composable.createFields?.()) ?? [],
    // flatten item if it exists (prepare for modify), if not then create new state
    state: item ? { ...contextItem.composable.flatten?.(item) } : { ...contextItem.defaultState },
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
      contextItem.ref.value = await contextItem.composable.get?.()
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
