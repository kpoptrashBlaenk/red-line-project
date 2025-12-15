import { useSettingsStore } from '@/stores/settings'
import { useUserStore } from '@/stores/user'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import apiUrl from './apiUrl'
apiUrl // ignore that (lint)

/**
 * URL of the API
 */
const API_URL = 'localhost:8100'

/**
 * Created axios instance
 */
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// request interceptor to add bearer token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore()
    const settingsStore = useSettingsStore()

    // bearer token if user
    if (userStore.user?.token) {
      config.headers.set?.('Authorization', `Bearer ${userStore.user.token}`)
    }

    // add language to config
    config.headers.set?.('App-Language', settingsStore.getLanguage)

    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

// response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status

      //  unauthorized
      if (status === 401) {
        // logout user & notify user that session expired
        window.location.href = '/auth/login'
      }

      // generic error
      const message = (error.response.data as any)?.message || error.message || 'Something went wrong.'
      // notify user
      message
    } else {
      // network error
      // notify user
    }

    return Promise.reject(error)
  },
)

/**
 * Get request from the API
 *
 * @param url Use {@link apiUrl} to create an URL
 * @param config
 */
export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await api.get<T>(url, config)
  return data
}

/**
 * Post request from the API
 *
 * @param url Use {@link apiUrl} to create an URL
 * @param config
 */
export async function apiPost<T>(url: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await api.post<T>(url, body, config)
  return data
}

/**
 * Put request from the API
 *
 * @param url Use {@link apiUrl} to create an URL
 * @param config
 */
export async function apiPut<T>(url: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await api.put<T>(url, body, config)
  return data
}

/**
 * Delete request from the API
 *
 * @param url Use {@link apiUrl} to create an URL
 * @param config
 */
export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await api.delete<T>(url, config)
  return data
}
