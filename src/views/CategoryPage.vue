<template>
  <DefaultContentLayout>
    <HeroComponent>
      <CategoryHero v-if="category" :category />
    </HeroComponent>

    <div class="wrap">
      <SeparatorComponent size="sm" />

      <!-- Content -->

      <SeparatorComponent size="md" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Category } from '$/types'
import CategoryHero from '@/components/heroes/CategoryHero.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { useCategory } from '@/composables/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

/* Constants */
const route = useRoute()
const categoryComposable = useCategory()

/* Refs */
const category = ref<Category>()

/* Lifecycle Hooks */
onMounted(async () => {
  category.value = await categoryComposable.find(Number(route.params.id))
})
</script>
