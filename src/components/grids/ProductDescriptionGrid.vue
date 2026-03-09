<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
    <SimpleCard
      v-for="(prop, key) in cardProps"
      :key
      color="primary"
      :title="prop.title"
      :content="prop.description"
      :icon="prop.icon"
    />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { Product } from '$/types'
import translation from '@/utils/translation'
import { constructOutline, shieldCheckmarkOutline, trendingUpOutline } from 'ionicons/icons'
import SimpleCard from '../ui/cards/SimpleCard.vue'

/* Props */
const props = defineProps<{
  product: Product
}>()

/* Constants */
const cardProps = [
  {
    title: translation('functionalities'),
    icon: constructOutline,
    description: translation(props.product.description_functionality),
  },
  {
    title: translation('advantages'),
    icon: trendingUpOutline,
    description: translation(props.product.description_advantage),
  },
  {
    title: translation('securities'),
    icon: shieldCheckmarkOutline,
    description: translation(props.product.description_security),
  },
]
</script>
