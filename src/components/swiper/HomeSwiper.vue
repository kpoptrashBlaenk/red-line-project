<template>
  <Swiper
    v-if="promotions.length > 0"
    :modules="[EffectCoverflow]"
    loop
    grabCursor
    centeredSlides
    :slides-per-view="'auto'"
    effect="coverflow"
    :coverflow-effect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
  >
    <SwiperSlide v-for="(promotion, key) in promotions" :key="key" class="bg-secondary">
      <HomeSwiperCard :promotion="promotion" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
/* Imports */
import { Promotion } from '$/types'
import { useHome } from '@/composables/home'
import { EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { onMounted, ref } from 'vue'
import HomeSwiperCard from '../ui/cards/HomeSwiperCard.vue'

/* Constants */
const { getPromotions } = useHome()

/* Refs */
const promotions = ref<Promotion[]>([])

/* Lifecycle Hooks */
onMounted(async () => {
  promotions.value = await getPromotions()
})
</script>

<style lang="css" scoped>
.swiper-slide {
  max-width: 300px;
  max-height: 300px;
}
</style>
