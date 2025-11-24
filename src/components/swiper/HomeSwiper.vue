<template>
  <Swiper
    v-if="promotions.length > 0"
    :modules="[EffectCoverflow]"
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
    <SwiperSlide v-for="(promotion, key) in promotions" :key="key" class="bg-primary max-w-80 md:max-w-120 max-h-80">
      <HomeSwiperCard :promotion="promotion" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
/* Imports */
import { Promotion } from '$/types'
import { EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import HomeSwiperCard from '../ui/cards/HomeSwiperCard.vue'

/* Props */
defineProps<{
  promotions: Promotion[]
}>()
</script>
