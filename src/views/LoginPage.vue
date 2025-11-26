<template>
  <IonPage>
    <!-- Header -->
    <IonHeader>
      <IonToolbar>
        <IonTitle>Login</IonTitle>
      </IonToolbar>
    </IonHeader>

    <!-- Content -->
    <IonContent :fullscreen="true">
      <FormComponent :fields :state="userState" :schema="userSchema" @submit="onSubmit" />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
/* Imports */
import FormComponent from '@/components/forms/FormComponent.vue'
import { useUserStore } from '@/stores/user'
import { FormField } from '@/types'
import { UserSchema, userSchema, userState } from '@/utils/schemas'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { reactive } from 'vue'

/* Constants */
const userStore = useUserStore()

/* Refs */
const fields: FormField[] = reactive([{ element: 'ion-input', name: 'name', label: 'Name' }])

/* Constants */
function onSubmit(state: UserSchema) {
  userStore.login(state)
}
</script>
