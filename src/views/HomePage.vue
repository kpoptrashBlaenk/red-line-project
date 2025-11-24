<template>
  <DefaultLayout>
    <HeroComponent :title="translation('home_carousel_title')">
      <HomeSwiper :promotions />
    </HeroComponent>

    <div class="wrap"></div>
  </DefaultLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Promotion } from '$/types'
import DefaultLayout from '@/components/layouts/default/DefaultLayout.vue'
import HomeSwiper from '@/components/swiper/HomeSwiper.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import { useHome } from '@/composables/home'
import translation from '@/utils/translation'
import { onMounted, ref } from 'vue'

/* Constants */
const { getPromotions } = useHome()

/* Refs */
const promotions = ref<Promotion[]>([])

/* Lifecycle Hooks */
onMounted(async () => {
  promotions.value = await getPromotions()
})
</script>
