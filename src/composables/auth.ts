import { User, VerifyPassword } from '$/types'
import { useUserStore } from '@/stores/user'
import { FormField } from '@/types'
import presentToast from '@/utils/presentToast'
import { ForgotPasswordSchema, LoginSchema, RegisterSchema, ResetPasswordSchema } from '@/utils/schemas'
import translation from '@/utils/translation'
import { checkmarkCircleOutline } from 'ionicons/icons'

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
    state
    // register which returns user

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
      rememberUser(user.token)
      return user
    }
  }

  /**
   * Login the user
   *
   * @param state The state that tracks the new values
   */
  async function login(state: LoginSchema) {
    state
    // login which returns user

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
      rememberUser(user.token)
      return user
    }
  }

  /**
   * Restore the user session
   */
  async function restore() {
    const token = localStorage.getItem('token')
    // login which returns user

    if (token) {
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
        rememberUser(user.token)
        return user
      }
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
    password
    // use token to verify if password is correct

    return true as VerifyPassword
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
    state
    // send email to password, if email doesnt exist, ignore

    presentToast(translation('toast_modified'), 'success', checkmarkCircleOutline)
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
  async function resetPassword(state: ResetPasswordSchema) {
    state
    // send email to password, if email doesnt exist, ignore

    presentToast(translation('toast_modified'), 'success', checkmarkCircleOutline)
  }

  async function deleteUser() {
    logout()

    // delete user from backend
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
