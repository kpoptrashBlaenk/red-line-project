<template>
  <DefaultContentLayout>
    <HeroComponent>
      <AdminPageGrid />
    </HeroComponent>

    <div class="wrap">
      <SeparatorComponent size="xs" />

      <IonAccordionGroup expand="inset" value="promotion">
        <AdminAccordionItem />
      </IonAccordionGroup>

      <SeparatorComponent size="md" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import AdminPageGrid from '@/components/grids/AdminPageGrid.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import AdminAccordionItem from '@/components/ui/items/AdminAccordionItem.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { IonAccordionGroup } from '@ionic/vue'
</script>
