<template>
  <div class="grid grid-cols-1 gap-5 wrap">
    <SolidButton
      v-for="(page, key) in adminPages"
      :key
      size="large"
      :label="translation(page)"
      color="primary"
      :selected="selectedPage === page"
      @click="$emit('update:selected-page', page)"
    />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { AdminPageKey, adminPages } from '@/constants/adminPages'
import translation from '@/utils/translation'
import SolidButton from '../ui/buttons/SolidButton.vue'

/* Props */
defineProps<{
  selectedPage: AdminPageKey
}>()
</script>
