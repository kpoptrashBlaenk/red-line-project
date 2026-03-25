import { Conversation, Message, MessageChoice, Social } from '$/types'
import { logoGithub } from 'ionicons/icons'

export const socialFixtures: Record<number, Social> = {
  1: {
    id: 1,
    logo: logoGithub,
    link: 'https://github.com/kpoptrashBlaenk',
  },
}

export const messageFixtures: Record<number, Message> = {
  1: {
    id: 1,
    created_at: '2026-03-03T09:00:00Z',
    sent_by: 'chatbot',
    message: { en: 'Hello! How can I help you today?', fr: "Bonjour ! Comment puis-je vous aider aujourd'hui ?" },
  },
  2: {
    id: 2,
    created_at: '2026-03-03T09:01:00Z',
    sent_by: 'user',
    message: { en: 'I want to check my subscription.', fr: 'Je veux vérifier mon abonnement.' },
  },
  3: {
    id: 3,
    created_at: '2026-03-03T09:02:00Z',
    sent_by: 'chatbot',
    message: { en: 'Sure! Which subscription?', fr: 'Bien sûr ! Quel abonnement ?' },
  },
  4: {
    id: 4,
    created_at: '2026-03-03T09:03:00Z',
    sent_by: 'user',
    message: { en: 'Premium', fr: 'Premium' },
  },
  5: {
    id: 5,
    created_at: '2026-03-03T09:04:00Z',
    sent_by: 'chatbot',
    message: {
      en: 'Your Premium subscription is active until 2026-12-31.',
      fr: "Votre abonnement Premium est actif jusqu'au 31/12/2026.",
    },
  },
  6: {
    id: 6,
    created_at: '2026-03-03T09:05:00Z',
    sent_by: 'user',
    message: { en: 'Great, thanks!', fr: 'Super, merci !' },
  },
  7: {
    id: 7,
    created_at: '2026-03-03T09:06:00Z',
    sent_by: 'chatbot',
    message: { en: 'Do you want to manage your subscription?', fr: 'Voulez-vous gérer votre abonnement ?' },
  },
  8: {
    id: 8,
    created_at: '2026-03-03T09:07:00Z',
    sent_by: 'user',
    message: { en: 'Yes, I want to cancel it.', fr: "Oui, je veux l'annuler." },
  },
  9: {
    id: 9,
    created_at: '2026-03-03T09:08:00Z',
    sent_by: 'chatbot',
    message: {
      en: 'Are you sure you want to cancel your subscription?',
      fr: 'Êtes-vous sûr de vouloir annuler votre abonnement ?',
    },
  },
  10: {
    id: 10,
    created_at: '2026-03-03T09:09:00Z',
    sent_by: 'user',
    message: { en: 'Yes, confirm.', fr: 'Oui, confirmez.' },
  },
  11: {
    id: 11,
    created_at: '2026-03-03T09:10:00Z',
    sent_by: 'chatbot',
    message: { en: 'Your subscription has been cancelled.', fr: 'Votre abonnement a été annulé.' },
  },
}

export const conversationFixtures: Record<number, Conversation> = {
  1: {
    id: 1,
    messages: [
      messageFixtures[1],
      messageFixtures[2],
      messageFixtures[3],
      messageFixtures[4],
      messageFixtures[5],
      messageFixtures[6],
      messageFixtures[7],
      messageFixtures[8],
      messageFixtures[9],
      messageFixtures[10],
      messageFixtures[11],
    ],
  },
}

export const messageChoiceFixtures: Record<number, MessageChoice> = {
  1: {
    key: 'check_subscription',
    text: { en: 'Check Subscription', fr: "Vérifier l'abonnement" },
  },
  2: {
    key: 'cancel_subscription',
    text: { en: 'Cancel Subscription', fr: "Annuler l'abonnement" },
  },
  3: {
    key: 'contact_support',
    text: { en: 'Contact Support', fr: 'Contacter le support' },
  },
}
