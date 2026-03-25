<template>
  <div class="ms-5">
    <IonButton
      v-for="(language, key) in ['fr', 'en']"
      :key
      fill="clear"
      :color="settingsStore.getLanguage === language ? 'primary' : 'light'"
      @click="settingsStore.setLanguage(language as Language)"
    >
      {{ language }}
    </IonButton>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useSettingsStore } from '@/stores/settings'
import { Language } from '@/types'
import { IonButton } from '@ionic/vue'

/* Constants */
const settingsStore = useSettingsStore()
</script>

<style lang="css" scoped>
ion-button::part(native) {
  --padding-start: 5px;
  --padding-end: 5px;
  --padding-top: 5px;
  --padding-bottom: 5px;
}
</style>
