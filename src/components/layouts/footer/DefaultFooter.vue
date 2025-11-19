<template>
  <footer class="bg-gradient py-10 px-5 text-white grid grid-cols-1 md:grid-cols-4 gap-5 items-start">
    <!-- Legal Mentions -->
    <div>
      <RouterLink to="/home">{{ translation('legal_mentions') }}</RouterLink>
    </div>
    <!-- General Conditions -->
    <div>
      <RouterLink to="/home">{{ translation('legal_mentions') }}</RouterLink>
    </div>

    <!-- Social Media -->
    <div class="flex flex-wrap gap-5 text-2xl">
      <a v-for="(social, key) in socials" :key :href="social.url" target="_blank">
        <IonIcon :icon="social.logo" />
      </a>
    </div>

    <!-- Info -->
    <div class="flex flex-col gap-3">
      <div>
        <LogoComponent />
      </div>
      <div>
        {{ infoText }}
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
/* Imports */
import LogoComponent from '@/components/ui/LogoComponent.vue'
import { useFooter } from '@/composables/footer'
import { Social } from '@/types'
import translation from '@/utils/translation'
import { IonIcon } from '@ionic/vue'
import { onMounted, ref } from 'vue'

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
