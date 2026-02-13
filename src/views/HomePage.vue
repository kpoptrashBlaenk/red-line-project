<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('home_carousel_title')">
      <HomeSwiper :promotions />
    </HeroComponent>

    <div class="wrap">
      <SeparatorComponent size="sm" />

      <TextBox :home-text />

      <SeparatorComponent size="sm" />

      <TitleComponent :text="translation('home_category_title')" color="secondary" />
      <HomeCategoryGrid :categories color="secondary" class="pt-5" />

      <SeparatorComponent size="md" />

      <TitleComponent :text="translation('home_product_title')" color="primary" />
      <HomeProductGrid :products color="primary" context="home" class="pt-5" />

      <SeparatorComponent size="md" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Category, HomeText, Product, Promotion } from '$/types'
import HomeCategoryGrid from '@/components/grids/HomeCategoryGrid.vue'
import HomeProductGrid from '@/components/grids/ProductGrid.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HomeSwiper from '@/components/swiper/HomeSwiper.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import TextBox from '@/components/ui/text/TextBox.vue'
import TitleComponent from '@/components/ui/text/TitleComponent.vue'
import { useCategory } from '@/composables/category'
import { useHomeText } from '@/composables/homeText'
import { useProduct } from '@/composables/product'
import { usePromotion } from '@/composables/promotion'
import translation from '@/utils/translation'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/* Constants */
const promotionComposable = usePromotion()
const homeTextComposable = useHomeText()
const categoryComposable = useCategory()
const productComposable = useProduct()
const route = useRoute()
const router = useRouter()

/* Refs */
const promotions = ref<Promotion[]>([])
const homeText = ref<HomeText[]>([])
const categories = ref<Category[]>([])
const products = ref<Product[]>([])

/* Lifecycle Hooks */
onMounted(async () => {
  // if first route is not home, go home then redirect to where needed
  const redirect = route.query.redirect as string | undefined
  if (redirect) {
    // remove redirect query
    await router.replace({ path: '/home', query: {} })

    await router.push(redirect)
  }

  promotions.value = await promotionComposable.get()
  homeText.value = await homeTextComposable.get()
  categories.value = await categoryComposable.get()
  products.value = await productComposable.top()
})
</script>
