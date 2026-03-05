import { MessageChoice } from '$/types'
import { conversationFixtures, messageChoiceFixtures } from '@/constants/fixtures'
import { ContactSchema } from '@/utils/schemas'

/**
 * Use this composable to do chatbot related queries
 */
export function useChatbot() {
  /**
   * Get latest conversation
   */
  async function getConversation() {
    const conversation = structuredClone(Object.values(conversationFixtures)[0])

    return conversation
  }

  /**
   * Get choices
   */
  async function getChoices() {
    const choices = Object.values(messageChoiceFixtures)

    return choices
  }

  /**
   * Send message (choice)
   */
  async function sendMessage(choice: MessageChoice) {
    choice

    await new Promise((resolve) => setTimeout(resolve, 2000))

    return
  }

  /**
   * Create new conversation
   */
  async function newConversation() {
    return
  }

  /**
   * Send the contact form
   */
  async function contactForm(data: ContactSchema) {
    data
  }

  // return all functions
  return { getConversation, getChoices, sendMessage, newConversation, contactForm }
}
