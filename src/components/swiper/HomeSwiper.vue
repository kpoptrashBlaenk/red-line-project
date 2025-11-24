<template>
  <!-- Mobile Swiper (with cool effects) -->
  <Swiper
    v-if="promotions.length > 0 && !isDesktop()"
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
  >
    <SwiperSlide v-for="(promotion, key) in promotions" :key="key" class="bg-primary max-w-80 md:max-w-120 max-h-80">
      <HomeSwiperCard :promotion="promotion" />
    </SwiperSlide>
  </Swiper>

  <!-- Desktop Swiper (without cool effects) -->
  <Swiper
    v-else-if="promotions.length > 0"
    grabCursor
    centeredSlides
    :slides-per-view="'auto'"
    :space-between="50"
    effect="slide"
  >
    <SwiperSlide v-for="(promotion, key) in promotions" :key="key" class="bg-primary max-w-80 md:max-w-120 max-h-80">
      <HomeSwiperCard :promotion="promotion" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
/* Imports */
import { Promotion } from '$/types'
import isDesktop from '@/utils/isDesktop'
import { EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import HomeSwiperCard from '../ui/cards/HomeSwiperCard.vue'

/* Props */
defineProps<{
  promotions: Promotion[]
}>()
</script>
