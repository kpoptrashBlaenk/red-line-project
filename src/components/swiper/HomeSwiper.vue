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
import { EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { reactive } from 'vue'
import HomeSwiperCard from '../ui/cards/HomeSwiperCard.vue'

/* Constants */
const promotions = reactive<Promotion[]>([
  {
    id: 1,
    image: 'https://cyna-it.fr/wp-content/uploads/2025/01/hopital-st-camille.png',
    title: "Mise en place d'un SOC Managé",
    subtitle: 'Centre hospitalier',
    button: "Lire l'artlicle",
    link: '/something',
    index: 1,
  },
  {
    id: 1,
    image: 'https://cyna-it.fr/wp-content/uploads/2025/01/hopital-st-camille.png',
    title: "Mise en place d'un SOC Managé",
    subtitle: 'Centre hospitalier',
    button: "Lire l'artlicle",
    link: '/something',
    index: 1,
  },
  {
    id: 1,
    image: 'https://cyna-it.fr/wp-content/uploads/2025/01/hopital-st-camille.png',
    title: "Mise en place d'un SOC Managé",
    subtitle: 'Centre hospitalier',
    button: "Lire l'artlicle",
    link: '/something',
    index: 1,
  },
  {
    id: 1,
    image: 'https://cyna-it.fr/wp-content/uploads/2025/01/hopital-st-camille.png',
    title: "Mise en place d'un SOC Managé",
    subtitle: 'Centre hospitalier',
    button: "Lire l'artlicle",
    link: '/something',
    index: 1,
  },
])
</script>

<style lang="css" scoped>
.swiper-slide {
  max-width: 300px;
  max-height: 300px;
}
</style>
