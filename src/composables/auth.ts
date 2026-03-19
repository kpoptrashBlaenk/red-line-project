import apiUrl from '$/constants/apiUrl'
import { User, VerifyPassword } from '$/types'
import { useUserStore } from '@/stores/user'
import { FormField } from '@/types'
import { apiDelete, apiPost } from '@/utils/api'
import presentToast from '@/utils/presentToast'
import { ForgotPasswordSchema, LoginSchema, RegisterSchema, ResetPasswordSchema } from '@/utils/schemas'
import translation from '@/utils/translation'

/**
 * Use this composable to do auth related queries
 */
export function useAuth() {
  const userStore = useUserStore()

  /**
   * Create Auth Form Fields
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
   * Create Login Form Fields
   */
  function createLoginFields() {
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
        name: 'password',
        label: translation('password'),
        no_padding: true,
        stacked: true,
        type: 'password',
      },
    ] as FormField[]
  }

  /**
   * Register a new user
   *
   * @param state The state that tracks the new values
   */
  async function register(state: RegisterSchema) {
    try {
      const user = await apiPost<User>(apiUrl('auth_register'), state)
      if (user) {
        userStore.setUser(user)
        rememberUser(user.token)
        return user
      }

      // error
    } catch (error: any) {
      console.error('Error registering:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Login the user
   *
   * @param state The state that tracks the new values
   */
  async function login(state: LoginSchema) {
    try {
      const user = await apiPost<User>(apiUrl('auth_login'), state)
      if (user) {
        userStore.setUser(user)
        rememberUser(user.token)
        return user
      }

      // login
    } catch (error: any) {
      console.error('Error logging in:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Restore the user session
   */
  async function restore() {
    const token = localStorage.getItem('token')

    if (!token) return
    try {
      const user = await apiPost<User>(apiUrl('auth_restore'), { token })
      if (user) {
        userStore.setUser(user)
        rememberUser(user.token)
        return user
      }

      // error
    } catch (error: any) {
      console.error('Error restoring session:', error)
      localStorage.removeItem('token')
    }
  }

  /**
   * Logout the user
   */
  async function logout() {
    localStorage.removeItem('token')

    userStore.setUser(undefined)
  }

  /**
   * Remember the user session
   */
  function rememberUser(token: string) {
    localStorage.setItem('token', token)
  }

  /**
   * Verify password
   */
  async function verifyPassword(password: string) {
    try {
      const result = await apiPost<boolean>(apiUrl('auth_verify_password'), { password })
      return result as VerifyPassword

      // error
    } catch (error: any) {
      console.error('Error verifying password:', error)
      await presentToast(error.message, 'danger')
      return false as VerifyPassword
    }
  }

  /**
   * Create Forgot Password Form Fields
   */
  function createForgotPasswordFields() {
    return [
      {
        element: 'input',
        name: 'email',
        label: translation('email'),
        no_padding: true,
      },
    ] as FormField[]
  }

  /**
   * Forgot password
   */
  async function forgotPassword(state: ForgotPasswordSchema) {
    try {
      await apiPost(apiUrl('auth_forgot_password'), state)
      presentToast(translation('toast_reset_link'), 'success')

      // error
    } catch (error: any) {
      console.error('Error sending reset link:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Create Reset Password Form Fields
   */
  function createResetPasswordFields() {
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
    ] as FormField[]
  }

  /**
   * Reset password
   */
  async function resetPassword(token: string, state: ResetPasswordSchema) {
    try {
      await apiPost(apiUrl('auth_reset_password'), { token, ...state })
      presentToast(translation('toast_password_reset'), 'success')

      // error
    } catch (error: any) {
      console.error('Error resetting password:', error)
      await presentToast(error.message, 'danger')
    }
  }

  async function deleteUser() {
    try {
      await apiDelete(apiUrl('auth_delete'))
      await logout()

      // error
    } catch (error: any) {
      console.error('Error deleting user:', error)
      await presentToast(error.message, 'danger')
    }
  }

  return {
    createRegisterFields,
    createLoginFields,
    register,
    login,
    restore,
    logout,
    verifyPassword,
    createForgotPasswordFields,
    forgotPassword,
    createResetPasswordFields,
    resetPassword,
    deleteUser,
  }
}
