<template>
  <DefaultContentLayout>
    <HeroComponent>
      <ProductSwiper v-if="product" :product> </ProductSwiper>
    </HeroComponent>

    <div class="wrap">
      <SeparatorComponent size="sm" />

      <SeparatorComponent size="md" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Product } from '$/types'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import ProductSwiper from '@/components/swiper/ProductSwiper.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { useProduct } from '@/composables/product'
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
