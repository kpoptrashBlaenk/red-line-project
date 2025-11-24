<template>
  <footer class="bg-gradient py-10 px-5">
    <div class="text-white grid grid-cols-1 md:grid-cols-5 gap-5 items-start wrap">
      <!-- Legal Mentions -->
      <div>
        <RouterLink to="/home">{{ translation('legal_mentions') }}</RouterLink>
      </div>
      <!-- General Conditions -->
      <div>
        <RouterLink to="/home">{{ translation('general_conditions') }}</RouterLink>
      </div>

      <!-- Contact -->
      <div>
        <RouterLink to="/home">{{ translation('contact') }}</RouterLink>
      </div>

      <!-- Social Media -->
      <DefaultSocialsFooter :socials />

      <!-- Info -->
      <DefaultInfoFooter :info-text />
    </div>
  </footer>
</template>

<script setup lang="ts">
/* Imports */
import { Social } from '$/types'
import { useFooter } from '@/composables/footer'
import translation from '@/utils/translation'
import { onMounted, ref } from 'vue'
import DefaultInfoFooter from './DefaultInfoFooter.vue'
import DefaultSocialsFooter from './DefaultSocialsFooter.vue'

/* Constants */
const { getInfoText, getSocials } = useFooter()

/* Refs */
const socials = ref<Social[]>([])
const infoText = ref<string>('')

/* Lifecycle Hooks */
onMounted(async () => {
  socials.value = await getSocials()
  infoText.value = await getInfoText()
})
</script>
