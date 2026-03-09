<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('legal_mentions')" />

    <div class="wrap">
      <div v-html="legalMentions"></div>

      <SeparatorComponent size="sm" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { useFooter } from '@/composables/footer'
import translation from '@/utils/translation'
import { onMounted, ref } from 'vue'

/* Constants */
const { getLegalMentions } = useFooter()

/* Refs */
const legalMentions = ref<string>()

/* Lifecycle Hooks */
onMounted(async () => {
  legalMentions.value = await getLegalMentions()
})
</script>
