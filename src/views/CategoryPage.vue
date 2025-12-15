<template>
  <DefaultContentLayout>
    <HeroComponent>
      <!-- Hero -->
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
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
</script>
