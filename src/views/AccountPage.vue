<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('account')" />

    <div class="wrap">
      <!-- Admin Form Modal -->
      <FormModal ref="modal" :is-open="modalOpen" :fields :state :schema @submit="onSubmit" @did-dismiss="modalOpen = false" />

      <!-- Admin Form Alert -->
      <FormAlert ref="alert" :is-open="alertOpen" @submit="onSubmit" @did-dismiss="alertOpen = false" />

      <SeparatorComponent size="xs" />

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

      <SeparatorComponent size="sm" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import FormAlert from '@/components/forms/FormAlert.vue'
import FormModal from '@/components/forms/FormModal.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { useUser } from '@/composables/user'
import { AccountGroup, AccountItem, FormField } from '@/types'
import { emailSchema, emailState, nameSchema, nameState } from '@/utils/schemas'
import translation from '@/utils/translation'
import { IonIcon, IonItem, IonList } from '@ionic/vue'
import { mailOutline, personOutline } from 'ionicons/icons'
import { ref } from 'vue'
import z from 'zod'

/* Constants */
const { createNameFields, modifyName, createEmailFields, modifyEmail } = useUser()
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
      // {
      //   label: translation('phone'),
      //   icon: callOutline,
      //   type: 'item',
      //   fields: createEmailFields(),
      //   state: emailState,
      //   schema: emailSchema(),
      //   onSubmit: modifyEmail,
      // },
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
      //     {
      //       label: translation('password'),
      //       icon: lockClosedOutline,
      //       type: 'item',
      //       fields: createNameFields(),
      //       state: any,
      //       schema: any,
      //       onSubmit: any,
      //     },
    ],
  },
]

/* Refs */
const modal = ref()
const alert = ref()
const modalOpen = ref<boolean>(false)
const alertOpen = ref<boolean>(false)
const fields = ref<FormField[]>([])
const state = ref<any>({})
const schema = ref<z.ZodType<any>>()
const onSubmit = ref<(state?: any) => Promise<void>>(async () => {})

/* Functions */
async function onModalOpen(item: AccountItem) {
  fields.value = item.fields
  state.value = item.state
  schema.value = item.schema
  onSubmit.value = async (state: any) => {
    await item.onSubmit(state)
    modal.value.$el.dismiss()
  }
  modalOpen.value = true
}
</script>

<style lang="css" scoped>
ion-item {
  --detail-icon-color: white;
  --detail-icon-opacity: 1;
  --detail-icon-font-size: 32px;
}
</style>
