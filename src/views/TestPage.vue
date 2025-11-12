<template>
  <div class="p-10 mx-30 grid grid-cols-2 gap-10">
    <SecondaryCardComponent
      title="Protection SOC 24/7"
      :icon="shieldCheckmarkOutline"
      subtitle="PME et ETI, protégez ce qui est essentiel pour votre entreprise"
      :list="[
        'Protégez votre environnement de travail (EDR et Digital Workplace) : postes, téléphones, serveurs, utilisateurs.',
        'Notre équipe de SOC analyste prend en charge la : détection, analyse et réponse aux incidents.',
      ]"
    />

    <SecondaryCardComponent
      title="Protection SOC 24/7"
      :icon="shieldCheckmarkOutline"
      subtitle="PME et ETI, protégez ce qui est essentiel pour votre entreprise"
      :list="[
        'Protégez votre environnement de travail (EDR et Digital Workplace) : postes, téléphones, serveurs, utilisateurs.',
        'Notre équipe de SOC analyste prend en charge la : détection, analyse et réponse aux incidents.',
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import SecondaryCardComponent from '@/components/cards/SecondaryCardComponent.vue'
import { shieldCheckmarkOutline } from 'ionicons/icons'
</script>
