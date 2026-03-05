<template>
  <div class="flex flex-col items-center">
    <SeparatorComponent size="sm" />

    <LogoComponent :light="false" />

    <SeparatorComponent size="sm" />

    <TitleComponent :text="`<title>${translation('offline')}</title>`" color="primary" />

    <SeparatorComponent size="sm" />

    <SolidButton :label="translation('try_again')" color="secondary" link="/home" size="large" />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import SolidButton from '@/components/ui/buttons/SolidButton.vue'
import LogoComponent from '@/components/ui/LogoComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import TitleComponent from '@/components/ui/text/TitleComponent.vue'
import translation from '@/utils/translation'
</script>
