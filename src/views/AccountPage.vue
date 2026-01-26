<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('account')" />

    <div class="wrap">
      <SeparatorComponent size="xs" />

      <template v-for="(group, key) in groups" :key="key">
        <div class="mx-2 mb-3 ps-2 text-xl font-bold border-b border-gray-400">
          {{ group.header }}
        </div>

        <IonList class="mb-10! rounded-2xl border-2 border-primary p-0!">
          <IonItem v-for="(item, key) in group.items" :key="key" color="primary" button>
            <IonIcon :icon="item.icon" slot="start" class="me-5" />

            <div class="flex h-18 items-center pt-1 text-2xl">
              {{ item.label }}
            </div>
          </IonItem>
        </IonList>
      </template>

      <SeparatorComponent size="sm" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import translation from '@/utils/translation'
import { IonIcon, IonItem, IonList } from '@ionic/vue'
import { callOutline, lockClosedOutline, mailOutline, personOutline } from 'ionicons/icons'

/* Constants */
const groups: { header: string; items: { label: string; icon: any; type: string }[] }[] = [
  {
    header: translation('user_info'),
    items: [
      { label: translation('name'), icon: personOutline, type: 'item' },
      { label: translation('phone'), icon: callOutline, type: 'item' },
    ],
  },
  {
    header: translation('authentication'),
    items: [
      { label: translation('email'), icon: mailOutline, type: 'item' },
      { label: translation('password'), icon: lockClosedOutline, type: 'item' },
    ],
  },
]
</script>

<style lang="css" scoped>
ion-item {
  --detail-icon-color: white;
  --detail-icon-opacity: 1;
  --detail-icon-font-size: 32px;
}
</style>
