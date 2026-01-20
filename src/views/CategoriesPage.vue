<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('categories')">
      <div class="wrap">
        <HomeCategoryGrid :categories color="primary" class="py-5" />
      </div>
    </HeroComponent>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Category } from '$/types'
import HomeCategoryGrid from '@/components/grids/HomeCategoryGrid.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import { useCategory } from '@/composables/category'
import translation from '@/utils/translation'
import { onMounted, ref } from 'vue'

/* Constants */
const categoryComposable = useCategory()

/* Refs */
const categories = ref<Category[]>([])

/* Lifecycle Hooks */
onMounted(async () => {
  categories.value = await categoryComposable.get()
})
</script>
