import apiUrl from '$/constants/apiUrl'
import { User } from '$/types'
import { useUserStore } from '@/stores/user'
import { FormField } from '@/types'
import { apiPut } from '@/utils/api'
import presentToast from '@/utils/presentToast'
import { EmailSchema, NameSchema, PasswordSchema, PhoneSchema } from '@/utils/schemas'
import translation from '@/utils/translation'
import { useAuth } from './auth'

/**
 * Use this composable to do user related queries that are not auth
 */
export function useUser() {
  const userStore = useUserStore()
  const { rememberUser } = useAuth()

  /**
   * Create Names Form Fields
   */
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

  /**
   * Modify the names
   *
   * @param state The state that tracks the new values
   */
  async function modifyName(state: NameSchema) {
    try {
      const user = await apiPut<User>(apiUrl('user_modify_name'), state)

      if (user) {
        userStore.setUser(user)
        presentToast(translation('toast_modified'), 'success')
      }

      // error
    } catch (error: any) {
      console.error('Error modifying name:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Create Phone Form Fields
   */
  function createPhoneFields() {
    return [
      {
        element: 'phone',
        name: 'phone',
        label: translation('phone'),
        no_padding: true,
      },
    ] as FormField[]
  }

  /**
   * Modify the names
   *
   * @param state The state that tracks the new values
   */
  async function modifyPhone(state: PhoneSchema) {
    try {
      const user = await apiPut<User>(apiUrl('user_modify_phone'), state)

      if (user) {
        userStore.setUser(user)
        presentToast(translation('toast_modified'), 'success')
      }

      // error
    } catch (error: any) {
      console.error('Error modifying phone:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Create Email Form Fields
   */
  function createEmailFields() {
    return [
      {
        element: 'input',
        name: 'email',
        label: translation('email'),
        no_padding: true,
        stacked: true,
      },
      {
        element: 'input',
        name: 'verify_password',
        label: translation('verify_password'),
        no_padding: true,
        stacked: true,
        type: 'password',
      },
    ] as FormField[]
  }

  /**
   * Modify the email
   *
   * @param state The state that tracks the new values
   */
  async function modifyEmail(state: EmailSchema) {
    try {
      const user = await apiPut<User>(apiUrl('user_modify_email'), state)

      if (user) {
        userStore.setUser(user)
        presentToast(translation('toast_modified'), 'success')
      }

      // error
    } catch (error: any) {
      console.error('Error modifying email:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Create Password Form Fields
   */
  function createPasswordFields() {
    return [
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
        element: 'input',
        name: 'verify_password',
        label: translation('verify_password'),
        no_padding: true,
        stacked: true,
        type: 'password',
      },
    ] as FormField[]
  }

  /**
   * Modify the password
   *
   * @param state The state that tracks the new values
   */
  async function modifyPassword(state: PasswordSchema) {
    try {
      const user = await apiPut<User>(apiUrl('auth_change_password'), state)

      if (user) {
        userStore.setUser(user)
        rememberUser(user.token)
        presentToast(translation('toast_modified'), 'success')
      }

      // error
    } catch (error: any) {
      console.error('Error modifying password:', error)
      await presentToast(error.message, 'danger')
    }
  }

  return {
    createNameFields,
    modifyName,
    createPhoneFields,
    modifyPhone,
    createEmailFields,
    modifyEmail,
    createPasswordFields,
    modifyPassword,
  }
}
