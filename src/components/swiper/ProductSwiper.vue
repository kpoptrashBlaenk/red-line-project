<template>
  <Swiper ref="swiper" :space-between="50" grab-cursor :thumbs="{ swiper: thumbsSwiper }" :modules>
    <SwiperSlide v-for="(image, key) in product.image" :key class="px-5">
      <IonImg :src="image" />
    </SwiperSlide>
  </Swiper>

  <div class="px-2 mt-5">
    <Swiper :space-between="10" :slides-per-view="4" free-mode watch-slides-progress :modules @swiper="setThumbsSwiper">
      <SwiperSlide
        v-for="(image, key) in product.image"
        :key
        class="cursor-pointer max-h-48 relative"
        @click="swiper?.$el.swiper.slideTo(key)"
      >
        <IonImg :src="image" :class="{ 'brightness-70': swiper?.$el.swiper.activeIndex !== key }" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { Product } from '$/types'
import { IonImg } from '@ionic/vue'
import { FreeMode, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref, useTemplateRef } from 'vue'

/* Props */
defineProps<{
  product: Product
}>()

/* Constants */
const modules = [FreeMode, Thumbs]

/* Refs */
const thumbsSwiper = ref()
const swiper = useTemplateRef('swiper')

/* Functions */
function setThumbsSwiper(swiper: any) {
  thumbsSwiper.value = swiper
}
</script>
