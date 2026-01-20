<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('products')"> </HeroComponent>

    <div class="wrap px-0! xl:px-0">
      <DefaultSearchContent />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import DefaultSearchContent from '@/components/layouts/default/DefaultSearchContent.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import translation from '@/utils/translation'
</script>
