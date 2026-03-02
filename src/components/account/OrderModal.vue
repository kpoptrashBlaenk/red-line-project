<template>
  <IonModal>
    <IonHeader>
      <IonToolbar color="primary" class="px-5">
        <IonTitle>{{ translation('order_details') }}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent></IonContent>

    <IonFooter>
      <IonToolbar>
        <IonButton color="secondary" size="large" expand="block">
          {{ translation('download') }}
          <IonIcon :icon="downloadOutline" class="ms-3 -mt-1" />
        </IonButton>
      </IonToolbar>
    </IonFooter>
  </IonModal>
</template>

<script setup lang="ts">
/* Imports */
import { Order } from '$/types'
import translation from '@/utils/translation'
import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from '@ionic/vue'
import { downloadOutline } from 'ionicons/icons'

/* Props */
defineProps<{
  order?: Order
}>()
</script>

<style lang="css" module>
ion-modal {
  --height: 90%;
  --width: 90%;
  --max-width: 1000px;
  --border-radius: 10px;
}
</style>
