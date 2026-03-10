<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('general_conditions')" />

    <div class="wrap">
      <div v-html="generalConditions"></div>

      <SeparatorComponent size="xs" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { useFooter } from '@/composables/footer'
import translation from '@/utils/translation'
import { onMounted, ref } from 'vue'

/* Constants */
const { getGeneralConditions } = useFooter()

/* Refs */
const generalConditions = ref<string>()

/* Lifecycle Hooks */
onMounted(async () => {
  generalConditions.value = await getGeneralConditions()
})
</script>
