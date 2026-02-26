<template>
  <DefaultContentLayout>
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
import { onMounted, ref } from 'vue'

/* Constants */
const categoryComposable = useCategory()

/* Refs */
const categories = ref<Category[]>([])

/* Lifecycle Hooks */
onMounted(async () => {
  categoryComposable.get().then((data) => (categories.value = data))
})
</script>
