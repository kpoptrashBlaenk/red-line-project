<template>
  <DefaultContentLayout :on-refresh>
    <HeroComponent>
      <div class="wrap">
        <ProductSwiper v-if="product" :product />

        <div class="text-7xl sm:text-8xl font-extrabold text-center text-white my-10">{{ translation(product?.name) }}</div>
      </div>
    </HeroComponent>

    <div class="wrap">
      <!-- Description -->
      <SeparatorComponent size="xs" />
      <ProductDescriptionGrid v-if="product" :product />

      <SeparatorComponent size="sm" />

      <!-- Characteristics -->
      <TitleComponent :text="translation('product_characteristics_title')" color="secondary" />
      <SeparatorComponent size="xs" />
      <div class="w-fit mx-auto">
        <ProductCharacteristicGrid :characteristics />
      </div>

      <SeparatorComponent size="sm" />

      <!-- Price -->
      <TitleComponent :text="translation('product_price_title')" color="primary" />
      <SeparatorComponent size="xs" />
      <IonCard color="light" class="py-5 lg:py-10">
        <IonCardContent>
          <ProductPriceGrid v-if="product" v-model="draftOrder" :product />
        </IonCardContent>
      </IonCard>

      <SolidButton
        :label="product?.disponible ? translation('subscribe_now') : translation('not_disponible')"
        color="primary"
        size="large"
        class="mt-5 mx-auto"
        expand="block"
        :disabled="!product?.disponible"
        @click="addToCheckout"
      />

      <SeparatorComponent size="sm" />

      <!-- Similar Products -->
      <TitleComponent :text="'<title>Similar</title> Products'" color="secondary" />
      <ProductGrid :products="similarProducts" color="secondary" context="category" class="mt-5" />

      <SeparatorComponent size="md" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Characteristic, Product } from '$/types'
import ProductCharacteristicGrid from '@/components/grids/ProductCharacteristicGrid.vue'
import ProductDescriptionGrid from '@/components/grids/ProductDescriptionGrid.vue'
import ProductGrid from '@/components/grids/ProductGrid.vue'
import ProductPriceGrid from '@/components/grids/ProductPriceGrid.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import ProductSwiper from '@/components/swiper/ProductSwiper.vue'
import SolidButton from '@/components/ui/buttons/SolidButton.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import TitleComponent from '@/components/ui/text/TitleComponent.vue'
import { useProduct } from '@/composables/product'
import { useCheckoutStore } from '@/stores/checkout'
import { Color, DraftOrder } from '@/types'
import shuffle from '@/utils/shuffle'
import translation from '@/utils/translation'
import { IonCard, IonCardContent, RefresherCustomEvent } from '@ionic/vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

/* Constants */
const route = useRoute()
const productComposable = useProduct()
const checkoutStore = useCheckoutStore()

/* Refs */
const product = ref<Product>()
const products = ref<Product[]>([])
const characteristics = reactive<{ [key: string]: { title: string; color: Color; characteristics: Characteristic[] } }>({
  performance: {
    title: translation('performance'),
    color: 'primary',
    characteristics: [],
  },
  scalability: {
    title: translation('scalability'),
    color: 'secondary',
    characteristics: [],
  },
  level: {
    title: translation('level'),
    color: 'tertiary',
    characteristics: [],
  },
})
const draftOrder = ref<DraftOrder>()

/* Computeds */
const similarProducts = computed(() => {
  let similarProducts = [] as Product[]

  // products of same category but random order
  const categoryProducts = shuffle(
    products.value.filter((p) => p.category.id === product.value?.category.id && p.id !== product.value?.id),
  )

  // priority
  similarProducts = categoryProducts.filter((p) => p.priority && p.disponible)

  // other available
  if (similarProducts.length < 6) {
    for (let i = 0; i < categoryProducts.length && similarProducts.length < 6; i++) {
      const newProduct = categoryProducts[i]

      if (newProduct.disponible && !similarProducts.includes(newProduct)) {
        similarProducts.push(newProduct)
      }
    }
  }

  return similarProducts
})

/* Lifecycle Hooks */
onMounted(async () => {
  const id = Number(route.params.id)
  product.value = await productComposable.find(id)

  characteristics.performance.characteristics = product.value.characteristics_performance
  characteristics.scalability.characteristics = product.value.characteristics_scalability
  characteristics.level.characteristics = product.value.characteristics_level

  productComposable.getByCategory(product.value.category.id).then((data) => (products.value = data))
})

/* Functions */
function addToCheckout() {
  if (!product.value || !draftOrder.value) return

  checkoutStore.addOrder(draftOrder.value)
}

async function onRefresh(event?: RefresherCustomEvent) {
  const id = Number(route.params.id)
  product.value = await productComposable.find(id)

  characteristics.performance.characteristics = product.value.characteristics_performance
  characteristics.scalability.characteristics = product.value.characteristics_scalability
  characteristics.level.characteristics = product.value.characteristics_level

  const productByCategoryPromise = productComposable.getByCategory(product.value.category.id).then((data) => {
    products.value = data
  })

  await Promise.all([productByCategoryPromise]).then(() => event?.target.complete())
}
</script>
