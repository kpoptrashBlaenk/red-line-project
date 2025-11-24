<template>
  <DefaultLayout>
    <PageTop :title="translation('home_carousel_title')">
      <HomeSwiper :promotions />
    </PageTop>
  </DefaultLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Promotion } from '$/types'
import DefaultLayout from '@/components/layouts/default/DefaultLayout.vue'
import HomeSwiper from '@/components/swiper/HomeSwiper.vue'
import PageTop from '@/components/ui/PageTop.vue'
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
