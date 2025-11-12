<template>
  <IonCard>
    <IonCardHeader v-if="title" color="secondary">
      <!-- Title -->
      <IonCardTitle>
        <div class="flex items-center justify-center text-2xl font-semibold p-4">
          <IonIcon v-if="icon" :icon class="text-4xl me-2"></IonIcon>
          <div>{{ title }}</div>
        </div>
      </IonCardTitle>
    </IonCardHeader>

    <IonCardContent>
      <div class="p-10">
        <!-- Subtitle -->
        <div v-if="subtitle" class="text-xl font-extrabold mb-5">
          {{ subtitle }}
        </div>

        <!-- Content -->
        <div v-if="content">
          {{ content }}
        </div>

        <!-- Content List -->
        <ul v-if="list" class="list-disc font-semibold text-base pl-5 mt-4">
          <li v-for="(item, index) in list" :key="index" class="mb-2.5">
            {{ item }}
          </li>
        </ul>
      </div>
    </IonCardContent>
  </IonCard>
</template>

<script setup lang="ts">
/* Imports */
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/vue'

/* Props */
defineProps<{
  title?: string
  icon?: string
  subtitle?: string
  content?: string
  list?: string[]
}>()
</script>

<style lang="css" scoped>
ion-card-content {
  color: var(--ion-text-color);
}
</style>
