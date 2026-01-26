<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('account')" />

    <div class="wrap">
      <SeparatorComponent size="sm" />

      <SeparatorComponent size="sm" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import translation from '@/utils/translation'
</script>
