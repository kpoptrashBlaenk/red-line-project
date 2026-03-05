<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('contact')" />

    <div class="wrap">
      <SeparatorComponent size="sm" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { useChatbot } from '@/composables/chatbot'
import translation from '@/utils/translation'

/* Constants */
const { contactForm } = useChatbot()
</script>
