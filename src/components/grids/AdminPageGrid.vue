<template>
  <!-- TODO: make this distributable by the amount of items -->
  <div class="grid grid-cols-2 gap-5 wrap">
    <SolidButton size="large" label="Home" color="primary"> </SolidButton>
    <SolidButton size="large" label="Category" color="primary"> </SolidButton>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import SolidButton from '../ui/buttons/SolidButton.vue'
</script>
