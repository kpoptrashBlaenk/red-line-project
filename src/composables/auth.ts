import { User } from '$/types'
import { useUserStore } from '@/stores/user'
import { FormField } from '@/types'
import { RegisterSchema } from '@/utils/schemas'
import translation from '@/utils/translation'

/**
 * Use this composable to do category related queries
 */
export function useAuth() {
  const userStore = useUserStore()

  /**
   * Create Category Form Fields
   */
  function createRegisterFields() {
    return [
      {
        element: 'input',
        name: 'first_name',
        label: translation('first_name'),
        no_padding: true,
        stacked: true,
      },
      {
        element: 'input',
        name: 'last_name',
        label: translation('last_name'),
        no_padding: true,
        stacked: true,
      },
      {
        element: 'input',
        name: 'email',
        label: translation('email'),
        no_padding: true,
        stacked: true,
      },
      {
        element: 'input',
        name: 'password',
        label: translation('password'),
        no_padding: true,
        stacked: true,
        type: 'password',
      },
      {
        element: 'input',
        name: 'confirm_password',
        label: translation('confirm_password'),
        no_padding: true,
        stacked: true,
        type: 'password',
      },
      {
        element: 'phone',
        name: 'phone',
        label: translation('phone'),
        no_padding: true,
        stacked: true,
      },
    ] as FormField[]
  }

  /**
   * Register a new user
   *
   * @param state The state that tracks the new values
   */
  async function register(state: RegisterSchema) {
    state
    const user = await findUser(0)
    // register which returns user

    userStore.setUser(user)
  }

  async function findUser(id: number) {
    id

    // fetch user using id

    const user: User = {
      id: 1,
      first_name: 'Aldin',
      last_name: 'Music',
      email: 'email@email.com',
      phone: '0101010101',
      prefix: '+33',
      token: 'ABSOLUTELY_HASHED_TOKEN',
    }

    return user
  }

  return { createRegisterFields, register, findUser }
}
