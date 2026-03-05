<template>
  <DefaultContentLayout :on-refresh>
    <HeroComponent :title="translation('categories')" />

    <SeparatorComponent size="sm" />

    <div class="wrap">
      <HomeCategoryGrid :categories color="primary" />
    </div>

    <SeparatorComponent size="sm" />
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Category } from '$/types'
import HomeCategoryGrid from '@/components/grids/HomeCategoryGrid.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { useCategory } from '@/composables/category'
import translation from '@/utils/translation'
import { RefresherCustomEvent } from '@ionic/vue'
import { onMounted, ref } from 'vue'

/* Constants */
const categoryComposable = useCategory()

/* Refs */
const categories = ref<Category[]>([])

/* Lifecycle Hooks */
onMounted(onRefresh)

/* Functions */
async function onRefresh(event?: RefresherCustomEvent) {
  categories.value = await categoryComposable.get()

  event?.target.complete()
}
</script>
