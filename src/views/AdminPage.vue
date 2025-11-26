<template>
  <DefaultContentLayout>
    <!-- Hero Page Grid -->
    <HeroComponent>
      <AdminPageGrid />
    </HeroComponent>

    <IonModal trigger="open-admin-form-modal" :is-open="true">
      <IonHeader>
        <IonToolbar color="primary" class="px-5">
          <IonTitle> Add a new Promotion </IonTitle>
        </IonToolbar>
      </IonHeader>

      <FormComponent :fields="fields.promotion" :state="promotionState" :schema="promotionSchema" @submit="onPromotionSubmit" />
    </IonModal>

    <div class="wrap">
      <SeparatorComponent size="xs" />

      <IonAccordionGroup expand="inset" value="promotion">
        <!-- Promotion Carousel Accordion -->
        <AdminAccordionItem
          :title="translation('admin_home_carousel_title')"
          :value="'promotion'"
          :items="promotions"
          image-key="image"
          text-key="title"
          :reorder-callback="reorderPromotions"
        />
      </IonAccordionGroup>

      <SeparatorComponent size="md" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import { Promotion } from '$/types'
import FormComponent from '@/components/forms/FormComponent.vue'
import AdminPageGrid from '@/components/grids/AdminPageGrid.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import AdminAccordionItem from '@/components/ui/items/AdminAccordionItem.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { usePromotion } from '@/composables/promotion'
import { FormField } from '@/types'
import { PromotionSchema, promotionSchema, promotionState } from '@/utils/schemas'
import translation from '@/utils/translation'
import { IonAccordionGroup, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/vue'
import { onMounted, reactive, ref } from 'vue'

/* Constants */
const { getPromotions, reorderPromotions } = usePromotion()

/* Refs */
const promotions = ref<Promotion[]>([])
const fields: { promotion: FormField[] } = reactive({ promotion: [{ element: 'ion-input', name: 'title', label: 'Title' }] })

/* Lifecycle Hooks */
onMounted(async () => {
  promotions.value = await getPromotions()
})

/* Functions */
function onPromotionSubmit(state: PromotionSchema) {
  console.log(state)
}
</script>

<style lang="css" scoped>
ion-modal {
  --height: auto;
  --width: 80%;
  --border-radius: 20px;
}
</style>
