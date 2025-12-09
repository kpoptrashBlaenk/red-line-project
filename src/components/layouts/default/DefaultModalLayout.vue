<template>
  <IonModal :is-open :initial-breakpoint="0.75" :breakpoints="[0, 0.75]" @will-dismiss="$emit('close:search-modal')">
    <IonContent color="light">
      <!-- Searchbar -->
      <IonSearchbar v-model="searchText" :placeholder="translation('search_product')" />

      <!-- Filters -->
      <div class="px-4 grid grid-cols-4">
        <SolidButton
          id="category-popover"
          color="primary"
          :label="translation('categories')"
          expand="block"
          @click="temporarySelectedCategories = [...selectedCategories]"
        />

        <div class="col-span-4 mt-2 flex flex-wrap gap-2">
          <IonChip
            v-for="(category, key) in selectedCategories.sort((a, b) => a.id - b.id)"
            :key
            color="primary"
            class="text-xs px-2"
            @click="
              selectedCategories.splice(
                selectedCategories.findIndex((c) => c.id === category.id),
                1,
              )
            "
          >
            <IonLabel class="me-1">{{ translation(category.name) }}</IonLabel>
            <IonIcon :icon="closeCircleOutline" />
          </IonChip>
        </div>
      </div>

      <!-- Popovers -->
      <IonPopover ref="categoryPopover" trigger="category-popover" @ion-popover-will-dismiss="temporarySelectedCategories = []">
        <div class="flex flex-col gap-2 pt-5 px-5 pb-3">
          <IonCheckbox
            v-for="(category, key) in categories"
            :key
            :checked="selectedCategories.find((c) => c.id === category.id) !== undefined"
            justify="space-between"
            color="primary"
            @ion-change="
              $event.detail.checked
                ? temporarySelectedCategories.push(category)
                : temporarySelectedCategories.splice(
                    temporarySelectedCategories.findIndex((c) => c.id === category.id),
                    1,
                  )
            "
          >
            {{ translation(category.name) }}
          </IonCheckbox>
        </div>

        <div class="flex justify-end pb-1 pe-2">
          <IonButton fill="clear" @click="categoryPopover?.$el.dismiss()">{{ translation('cancel') }}</IonButton>
          <IonButton
            fill="clear"
            @click="
              () => {
                selectedCategories = temporarySelectedCategories
                categoryPopover?.$el.dismiss()
              }
            "
            >Ok</IonButton
          >
        </div>
      </IonPopover>

      <!-- List -->
      <IonList class="bg-light">
        <!-- Item -->
        <SearchProductItem :search-text :products :categories :characteristics />
      </IonList>
    </IonContent>
  </IonModal>
</template>

<script setup lang="ts">
/* Imports */
import { Category, Characteristic, Product } from '$/types'
import SolidButton from '@/components/ui/buttons/SolidButton.vue'
import SearchProductItem from '@/components/ui/items/SearchProductItem.vue'
import { useCategory } from '@/composables/category'
import { useCharacteristic } from '@/composables/characteristic'
import { useProduct } from '@/composables/product'
import translation from '@/utils/translation'
import {
  IonButton,
  IonCheckbox,
  IonChip,
  IonContent,
  IonIcon,
  IonLabel,
  IonList,
  IonModal,
  IonPopover,
  IonSearchbar,
} from '@ionic/vue'
import { closeCircleOutline } from 'ionicons/icons'
import { onMounted, ref } from 'vue'

/* Props */
defineProps<{
  isOpen: boolean
}>()

/* Constants */
const productComposable = useProduct()
const categoryComposable = useCategory()
const characteristicComposable = useCharacteristic()

/* Refs */
const searchText = ref<string>('')
const selectedCategories = ref<Category[]>([])
const temporarySelectedCategories = ref<Category[]>([])
const categoryPopover = ref()
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const characteristics = ref<Characteristic[]>([])

/* Lifecycle Hooks */
onMounted(async () => {
  products.value = await productComposable.get()
  categories.value = await categoryComposable.get()
  characteristics.value = await characteristicComposable.get()
})
</script>

<style lang="css" scoped>
ion-modal {
  --width: 100%;
}
</style>
