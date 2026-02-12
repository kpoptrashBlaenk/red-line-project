<template>
  <template v-for="(group, key) in groups" :key="key">
    <div class="mx-2 mb-3 ps-2 text-xl font-bold border-b border-gray-400">
      {{ group.header }}
    </div>

    <IonList class="mb-10! rounded-2xl border-2 border-primary p-0!">
      <IonItem v-for="(item, key) in group.items" :key="key" color="primary" button @click="onModalOpen(item)">
        <IonIcon :icon="item.icon" slot="start" class="me-5" />

        <div class="flex h-18 items-center pt-1 text-2xl">
          {{ item.label }}
        </div>
      </IonItem>
    </IonList>
  </template>
</template>

<script setup lang="ts">
/* Imports */
import { useUser } from '@/composables/user'
import { AccountGroup, AccountItem } from '@/types'
import {
  emailSchema,
  emailState,
  nameSchema,
  nameState,
  passwordSchema,
  passwordState,
  phoneSchema,
  phoneState,
} from '@/utils/schemas'
import translation from '@/utils/translation'
import { IonIcon, IonItem, IonList } from '@ionic/vue'
import { callOutline, lockClosedOutline, mailOutline, personOutline } from 'ionicons/icons'

/* Props */
defineProps<{
  onModalOpen: (item: AccountItem) => void
}>()

/* Constants */
const {
  createNameFields,
  modifyName,
  createPhoneFields,
  modifyPhone,
  createEmailFields,
  modifyEmail,
  createPasswordFields,
  modifyPassword,
} = useUser()
const groups: AccountGroup[] = [
  {
    header: translation('user_info'),
    items: [
      {
        label: translation('name'),
        icon: personOutline,
        type: 'item',
        fields: createNameFields(),
        state: nameState,
        schema: nameSchema(),
        onSubmit: modifyName,
      },
      {
        label: translation('phone'),
        icon: callOutline,
        type: 'item',
        fields: createPhoneFields(),
        state: phoneState,
        schema: phoneSchema(),
        onSubmit: modifyPhone,
      },
    ],
  },
  {
    header: translation('authentication'),
    items: [
      {
        label: translation('email'),
        icon: mailOutline,
        type: 'item',
        fields: createEmailFields(),
        state: emailState,
        schema: emailSchema(),
        onSubmit: modifyEmail,
      },
      {
        label: translation('password'),
        icon: lockClosedOutline,
        type: 'item',
        fields: createPasswordFields(),
        state: passwordState,
        schema: passwordSchema(),
        onSubmit: modifyPassword,
      },
    ],
  },
]
</script>
