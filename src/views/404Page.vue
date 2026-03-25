<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('404')" />

    <div class="wrap">
      <SeparatorComponent size="sm" />

      <div class="flex justify-center">
        <SolidButton :label="translation('home')" color="primary" :link="'/home'" size="large" class="w-48!" />
      </div>
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import SolidButton from '@/components/ui/buttons/SolidButton.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import translation from '@/utils/translation'
</script>
