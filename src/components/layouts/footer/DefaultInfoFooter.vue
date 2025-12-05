<template>
  <div class="flex flex-col gap-3">
    <div>
      <LogoComponent light />
    </div>
    <div>
      {{ infoText }}
    </div>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import LogoComponent from '@/components/ui/LogoComponent.vue'

/* Props */
defineProps<{
  infoText: string
}>()
</script>
