<template>
  <DefaultContentLayout>
    <!-- Hero Page Grid -->
    <HeroComponent>
      <AdminPageGrid />
    </HeroComponent>

    <div class="wrap">
      <SeparatorComponent size="xs" />

      <IonAccordionGroup expand="inset" value="promotion">
        <!-- Promotion Carousel Accordion -->
        <AdminAccordionItem
          :title="translation('admin_home_carousel_title')"
          :value="'promotion'"
          :items="promotions"
          image-key="image"
          text-key="title"
          :reorder-callback="reorderPromotions"
        />
      </IonAccordionGroup>

      <SeparatorComponent size="md" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Promotion } from '$/types'
import AdminPageGrid from '@/components/grids/AdminPageGrid.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import AdminAccordionItem from '@/components/ui/items/AdminAccordionItem.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { usePromotion } from '@/composables/promotion'
import translation from '@/utils/translation'
import { IonAccordionGroup } from '@ionic/vue'
import { onMounted, ref } from 'vue'

/* Constants */
const { getPromotions, reorderPromotions } = usePromotion()

/* Refs */
const promotions = ref<Promotion[]>([])

/* Lifecycle Hooks */
onMounted(async () => {
  promotions.value = await getPromotions()
})
</script>
