<template>
  <DefaultContentLayout :on-refresh="defaultSearchContent?.onRefresh">
    <HeroComponent :title="translation('products')"> </HeroComponent>

    <div class="wrap px-0! xl:px-0">
      <DefaultSearchContent ref="defaultSearchContent" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import DefaultSearchContent from '@/components/layouts/default/DefaultSearchContent.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import translation from '@/utils/translation'
import { useTemplateRef } from 'vue'

/* Refs */
const defaultSearchContent = useTemplateRef('defaultSearchContent')
</script>
