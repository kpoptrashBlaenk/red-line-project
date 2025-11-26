<template>
  <!-- TODO: make this distributable by the amount of items -->
  <div class="grid grid-cols-2 gap-5 wrap">
    <SolidButton size="large" :label="translation('home')" color="primary"> </SolidButton>
    <SolidButton size="large" :label="translation('category')" color="primary"> </SolidButton>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import translation from '@/utils/translation'
import SolidButton from '../ui/buttons/SolidButton.vue'
</script>
