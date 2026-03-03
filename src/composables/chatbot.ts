import { conversationFixtures } from '@/constants/fixtures'

/**
 * Use this composable to do chatbot related queries
 */
export function useChatbot() {
  /**
   * Get latest conversation
   */
  async function getConversation() {
    const conversation = Object.values(conversationFixtures)[0]

    return conversation
  }

  // return all functions
  return { getConversation }
}
