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
      <HomeCategoryGrid :categories />

      <SeparatorComponent size="md" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Category, HomeText, Promotion } from '$/types'
import HomeCategoryGrid from '@/components/grids/HomeCategoryGrid.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HomeSwiper from '@/components/swiper/HomeSwiper.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import TextBox from '@/components/ui/text/TextBox.vue'
import TitleComponent from '@/components/ui/text/TitleComponent.vue'
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
const homeText = ref<HomeText[]>([])
const categories = ref<Category[]>([])

/* Lifecycle Hooks */
onMounted(async () => {
  promotions.value = await getPromotions()
  homeText.value = await getHomeText()
  categories.value = await getCategories()
})
</script>
