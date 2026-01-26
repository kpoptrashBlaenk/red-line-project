import { User } from '$/types'
import { useUserStore } from '@/stores/user'
import { FormField } from '@/types'
import presentToast from '@/utils/presentToast'
import { NameSchema } from '@/utils/schemas'
import translation from '@/utils/translation'
import { checkmarkCircleOutline } from 'ionicons/icons'

/**
 * Use this composable to do user related queries that are not auth
 */
export function useUser() {
  const userStore = useUserStore()

  function createNameFields() {
    return [
      {
        element: 'input',
        name: 'first_name',
        label: translation('first_name'),
        no_padding: true,
      },
      {
        element: 'input',
        name: 'last_name',
        label: translation('last_name'),
        no_padding: true,
      },
    ] as FormField[]
  }

  async function modifyName(state: NameSchema) {
    state
    // modify name and return user

    const user: User = {
      id: 1,
      first_name: 'Aldin',
      last_name: 'Music',
      email: 'email@email.com',
      phone: '0101010101',
      prefix: '+33',
      token: 'ABSOLUTELY_HASHED_TOKEN',
    }

    if (user) {
      userStore.setUser(user)
      presentToast(translation('toast_modified'), 'success', checkmarkCircleOutline)
    }
  }

  return { createNameFields, modifyName }
}
