<template>
  <IonContent>
    <div class="p-10 mx-30 grid grid-cols-2 gap-10">
      <CardComponent v-for="(props, key) in cardProps" :key :props />
    </div>
  </IonContent>
</template>

<script setup lang="ts">
import CardComponent from '@/components/cards/CardComponent.vue'
import { CardProps } from '@/types'
import { IonContent } from '@ionic/vue'
import { documentTextOutline, lockClosedOutline, personOutline, searchOutline, shieldCheckmarkOutline } from 'ionicons/icons'

const cardProps: CardProps[] = [
  {
    title: {
      text: 'Protection SOC 24/7',
      icon: shieldCheckmarkOutline,
      background: 'secondary',
      position: 'center',
    },
    subtitle: {
      text: 'PME et ETI, protégez ce qui est essentiel pour votre entreprise',
    },
    list: {
      items: [
        'Protégez votre environnement de travail (EDR et Digital Workplace) : postes, téléphones, serveurs, utilisateurs.',
        'Notre équipe de SOC analyste prend en charge la : détection, analyse et réponse aux incidents.',
      ],
    },
  },

  {
    title: {
      text: 'Réponse à incident',
      icon: personOutline,
      background: 'primary',
      position: 'center',
    },
    subtitle: {
      text: 'En cas d’incident, notre CERT vous accompagne',
    },
    list: {
      items: [
        'Une équipe certifiée et membre de l’InterCERT',
        'Astreinte en 24/7',
        'Son plan d’intervention en 6 étapes vous permet de retrouver rapidement de la sérénité en cas d’attaque',
      ],
    },
  },

  {
    color: 'light',
    title: {
      text: 'Améliorer le niveau de sécurité',
      icon: lockClosedOutline,
      color: 'primary',
    },
    list: {
      items: ['Bénéficier d’un accompagnement spécialisé en cybersécurité', 'Remplacer l’antivirus peu efficace'],
    },
  },
  {
    color: 'light',
    title: {
      text: 'Se protéger suite à une cyberattaque',
      icon: shieldCheckmarkOutline,
      color: 'secondary',
    },
    list: {
      items: ['Se prémunir des futurs risques et attaques'],
    },
  },

  {
    color: 'light',
    title: {
      text: 'Définir',
      icon: documentTextOutline,
      color: 'primary',
    },
    content: {
      text: 'Le niveau de sécurité global.',
    },
  },
  {
    color: 'light',
    title: {
      text: 'Identifier',
      icon: searchOutline,
      color: 'secondary',
    },
    content: {
      text: 'Les <b>vulnérabilités</b> et les risques critiques.',
    },
  },
]
</script>
