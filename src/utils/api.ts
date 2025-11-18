import { useUserStore } from '@/stores/user'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const API_URL = 'localhost:8100'

// create axios instance
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

    // bearer token if user
    if (userStore.user?.token) {
      config.headers.set?.('Authorization', `Bearer ${userStore.user.token}`)
    }

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

// get
export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await api.get<T>(url, config)
  return data
}

// post
export async function apiPost<T>(url: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await api.post<T>(url, body, config)
  return data
}

// put
export async function apiPut<T>(url: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await api.put<T>(url, body, config)
  return data
}

// delete
export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await api.delete<T>(url, config)
  return data
}

export default api
