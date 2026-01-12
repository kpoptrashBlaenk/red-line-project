<template>
  <DefaultContentLayout>
    <HeroComponent>
      <div class="wrap">
        <ProductSwiper v-if="product" :product />

        <div class="text-7xl sm:text-8xl font-extrabold text-center text-white my-10">{{ translation(product?.name) }}</div>
      </div>
    </HeroComponent>

    <div class="wrap">
      <ProductDescriptionGrid v-if="product" class="mt-10" :product />

      <SeparatorComponent size="md" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Product } from '$/types'
import ProductDescriptionGrid from '@/components/grids/ProductDescriptionGrid.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import ProductSwiper from '@/components/swiper/ProductSwiper.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { useProduct } from '@/composables/product'
import translation from '@/utils/translation'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
/* Constants */
const route = useRoute()
const productComposable = useProduct()

/* Refs */
const product = ref<Product>()

/* Lifecycle Hooks */
onMounted(async () => {
  const id = Number(route.params.id)
  product.value = await productComposable.find(id)
})
</script>
