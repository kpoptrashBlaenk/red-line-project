<template>
  <footer class="bg-gradient py-10 px-5 text-white grid grid-cols-1 md:grid-cols-4 gap-5 items-start">
    <!-- Legal Mentions -->
    <div>
      <RouterLink to="/home">{{ translations[settingsStore.getLanguage].legal_mentions }}</RouterLink>
    </div>
    <!-- General Conditions -->
    <div>
      <RouterLink to="/home">{{ translations[settingsStore.getLanguage].general_conditions }}</RouterLink>
    </div>

    <!-- Social Media -->
    <div class="flex flex-wrap gap-5 text-2xl">
      <RouterLink to="/">
        <IonIcon :icon="logoAmazon" />
      </RouterLink>
    </div>

    <!-- Info -->
    <div class="flex flex-col gap-3">
      <div>
        <LogoComponent />
      </div>
      <div>
        {{ infoTextRef }}
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
/* Imports */
import LogoComponent from '@/components/ui/LogoComponent.vue'
import { useFooter } from '@/composables/footer'
import translations from '@/constants/translations'
import { useSettingsStore } from '@/stores/settings'
import { IonIcon } from '@ionic/vue'
import { logoAmazon } from 'ionicons/icons'
import { onMounted, ref } from 'vue'

/* Constants */
const settingsStore = useSettingsStore()
const { infoText } = useFooter()

/* Refs */
const infoTextRef = ref<string>('')

/* Lifecycle Hooks */
onMounted(async () => {
  infoTextRef.value = await infoText()
})
</script>
