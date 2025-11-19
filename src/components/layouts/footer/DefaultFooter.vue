<template>
  <footer class="bg-gradient py-10 px-5 text-white grid grid-cols-1 md:grid-cols-4 gap-5 items-start">
    <!-- Legal Mentions -->
    <div>
      <RouterLink to="/home">Legal Mentions</RouterLink>
    </div>
    <!-- General Conditions -->
    <div>
      <RouterLink to="/home">General Conditions</RouterLink>
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
        Cyna is a pure player in cybersecurity for SMEs and MSPs. Quality of service is at the heart of our business, where we
        prioritize expertise, proximity, and speed of execution.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
/* Imports */
import LogoComponent from '@/components/ui/LogoComponent.vue'
import { IonIcon } from '@ionic/vue'
import { logoAmazon } from 'ionicons/icons'
</script>
