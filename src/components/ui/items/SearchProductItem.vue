<template>
  <!-- Item -->
  <IonItem v-for="(product, key) in joinedProducts" :key button detail color="light" :router-link="`/product/${product.id}`">
    <div class="grid grid-cols-[80px_1fr_auto] py-3 gap-4 items-start w-full">
      <!-- Image -->
      <IonImg :src="product.image" class="my-auto" />

      <!-- Name & Description -->
      <div>
        <IonLabel class="font-bold mb-1 text-xl!" color="primary">{{ translation(product.name) }}</IonLabel>
        <div class="text-gray-500 text-sm leading-4">{{ translation(product.description_functionality) }}</div>
      </div>

      <!-- Category & Price -->
      <div class="font-semibold text-lg text-end">
        <IonLabel color="primary">{{ translation(product.category?.name) }}</IonLabel>
        <IonLabel color="secondary">{{ product.price }}€</IonLabel>
      </div>

      <!-- Characteristics -->
      <div class="col-span-3 flex flex-wrap gap-2 mt-2">
        <IonChip
          v-for="(characteristic, key) in product.characteristics"
          :key="key"
          :color="
            characteristic?.type === 'performance' ? 'primary' : characteristic?.type === 'scalability' ? 'secondary' : 'tertiary'
          "
          class="px-2 text-xs pointer-events-none"
        >
          {{ translation(characteristic?.name) }}
        </IonChip>
      </div>
    </div>
  </IonItem>
</template>

<script setup lang="ts">
/* Imports */
import { Category, Characteristic, Product } from '$/types'
import { useCategory } from '@/composables/category'
import { useCharacteristic } from '@/composables/characteristic'
import { useProduct } from '@/composables/product'
import findById from '@/utils/findById'
import translation from '@/utils/translation'
import { IonChip, IonImg, IonItem, IonLabel } from '@ionic/vue'
import { computed, onMounted, ref } from 'vue'

/* Constants */
const productComposable = useProduct()
const categoryComposable = useCategory()
const characteristicComposable = useCharacteristic()

/* Refs */
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const characteristics = ref<Characteristic[]>([])

/* Computeds */
const joinedProducts = computed(() =>
  products.value.map((product) => ({
    ...product,
    category: findById(categories.value, product.category_id),
    characteristics: [
      ...product.characteristics_performance_ids,
      ...product.characteristics_scalability_ids,
      ...product.characteristics_level_ids,
    ].map((characteristic) => findById(characteristics.value, characteristic)),
  })),
)

/* Lifecycle Hooks */
onMounted(async () => {
  products.value = await productComposable.get()
  categories.value = await categoryComposable.get()
  characteristics.value = await characteristicComposable.get()
})
</script>
