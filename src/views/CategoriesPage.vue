<template>
  <DefaultContentLayout :on-refresh>
    <HeroComponent :title="translation('categories')" />

    <SeparatorComponent size="xs" />

    <div class="wrap">
      <!-- Skeleton -->
      <HomeCategoryGridSkeleton v-if="!categories || categories.length === 0" color="primary" />

      <!-- Grid -->
      <HomeCategoryGrid v-else :categories color="primary" />
    </div>

    <SeparatorComponent size="xs" />
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Category } from '$/types'
import HomeCategoryGrid from '@/components/grids/HomeCategoryGrid.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HomeCategoryGridSkeleton from '@/components/skeletons/HomeCategoryGridSkeleton.vue'
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
