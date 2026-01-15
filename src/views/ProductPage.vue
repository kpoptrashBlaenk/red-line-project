<template>
  <DefaultContentLayout>
    <HeroComponent>
      <div class="wrap">
        <ProductSwiper v-if="product" :product />

        <div class="text-7xl sm:text-8xl font-extrabold text-center text-white my-10">{{ translation(product?.name) }}</div>
      </div>
    </HeroComponent>

    <div class="wrap">
      <!-- Description -->
      <SeparatorComponent size="xs" />
      <ProductDescriptionGrid v-if="product" :product />

      <SeparatorComponent size="sm" />

      <!-- Characteristics -->
      <TitleComponent :text="translation('product_characteristics_title')" color="secondary" />
      <SeparatorComponent size="xs" />
      <div class="w-fit mx-auto">
        <ProductCharacteristicGrid :characteristics />
      </div>

      <SeparatorComponent size="sm" />

      <!-- Price -->
      <TitleComponent :text="translation('product_price_title')" color="primary" />
      <SeparatorComponent size="xs" />
      <IonCard color="light" class="py-5 lg:py-10">
        <IonCardContent>
          <ProductPriceGrid v-if="product" :product />
        </IonCardContent>
      </IonCard>

      <SolidButton
        :label="product?.disponible ? translation('subscribe_now') : translation('not_disponible')"
        color="primary"
        size="large"
        class="mt-5 mx-auto"
        expand="block"
        :disabled="!product?.disponible"
      />

      <SeparatorComponent size="md" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Characteristic, Product } from '$/types'
import ProductCharacteristicGrid from '@/components/grids/ProductCharacteristicGrid.vue'
import ProductDescriptionGrid from '@/components/grids/ProductDescriptionGrid.vue'
import ProductPriceGrid from '@/components/grids/ProductPriceGrid.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import ProductSwiper from '@/components/swiper/ProductSwiper.vue'
import SolidButton from '@/components/ui/buttons/SolidButton.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import TitleComponent from '@/components/ui/text/TitleComponent.vue'
import { useCharacteristic } from '@/composables/characteristic'
import { useProduct } from '@/composables/product'
import { Color } from '@/types'
import translation from '@/utils/translation'
import { IonCard, IonCardContent } from '@ionic/vue'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const productComposable = useProduct()
const characteristicComposable = useCharacteristic()

/* Refs */
const product = ref<Product>()
const characteristics = reactive<{ [key: string]: { title: string; color: Color; characteristics: Characteristic[] } }>({
  performance: {
    title: translation('performance'),
    color: 'primary',
    characteristics: [],
  },
  scalability: {
    title: translation('scalability'),
    color: 'secondary',
    characteristics: [],
  },
  level: {
    title: translation('level'),
    color: 'tertiary',
    characteristics: [],
  },
})

/* Lifecycle Hooks */
onMounted(async () => {
  const id = Number(route.params.id)
  product.value = await productComposable.find(id)

  const characteristicsApi = await characteristicComposable.findMultiple([
    ...product.value!.characteristics_level_ids,
    ...product.value!.characteristics_performance_ids,
    ...product.value!.characteristics_scalability_ids,
  ])
  characteristics.performance.characteristics = characteristicsApi.filter((c) => c.type === 'performance')
  characteristics.scalability.characteristics = characteristicsApi.filter((c) => c.type === 'scalability')
  characteristics.level.characteristics = characteristicsApi.filter((c) => c.type === 'level')
})
</script>
