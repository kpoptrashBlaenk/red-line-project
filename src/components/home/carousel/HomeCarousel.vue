<template>
  <Swiper
    :effect="'coverflow'"
    grabCursor
    centeredSlides
    :slidesPerView="'auto'"
    :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }"
    :modules="[EffectCoverflow]"
    loop
    class="m-10"
  >
    <SwiperSlide v-for="(promotion, key) in promotions" :key class="bg-secondary">
      <IonCard class="mb-0.5 rounded-none">
        <IonImg :src="promotion.image" class="bg-secondary h-32 p-2" />

        <IonCardHeader class="p-5 text-start">
          <IonCardTitle>{{ promotion.title }}</IonCardTitle>
          <IonCardSubtitle class="mb-2">{{ promotion.subtitle }}</IonCardSubtitle>
        </IonCardHeader>

        <div class="flex justify-end pb-3 bg-white">
          <IonButton fill="clear" color="secondary" :router-link="promotion.link">
            {{ promotion.button }}
            <IonIcon :icon="chevronForward" />
          </IonButton>
        </div>
      </IonCard>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
/* Imports */
import { Promotion } from '$/types'
import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonImg } from '@ionic/vue'
import { chevronForward } from 'ionicons/icons'
import { EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { reactive } from 'vue'

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

<style>
.swiper-slide {
  max-width: 300px;
  max-height: 300px;
}
</style>
