<template>
  <DefaultLayout>
    <HeroComponent :title="translation('home_carousel_title')">
      <HomeSwiper :promotions />
    </HeroComponent>

    <div class="wrap">
      <SeparatorComponent />

      <TextBox :home-text />

      <SeparatorComponent />

      <TitleComponent :text="translation('home_category_title')" color="secondary" />
      <HomeCategoryGrid :categories />

      <SeparatorComponent />
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Category, Promotion } from '$/types'
import HomeCategoryGrid from '@/components/grids/HomeCategoryGrid.vue'
import DefaultLayout from '@/components/layouts/default/DefaultLayout.vue'
import HomeSwiper from '@/components/swiper/HomeSwiper.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import TextBox from '@/components/ui/text/TextBox.vue'
import TitleComponent from '@/components/ui/TitleComponent.vue'
import { useCategory } from '@/composables/category'
import { useHomeText } from '@/composables/homeText'
import { usePromotion } from '@/composables/promotion'
import translation from '@/utils/translation'
import { onMounted, ref } from 'vue'

/* Constants */
const { getPromotions } = usePromotion()
const { getHomeText } = useHomeText()
const { getCategories } = useCategory()

/* Refs */
const promotions = ref<Promotion[]>([])
const homeText = ref<string>('')
const categories = ref<Category[]>([])

/* Lifecycle Hooks */
onMounted(async () => {
  promotions.value = await getPromotions()
  homeText.value = await getHomeText()
  categories.value = await getCategories()
})
</script>
