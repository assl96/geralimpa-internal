import type { ApiResponse } from '@/types/api'

const BASE_URL = import.meta.env.VITE_API_URL

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface RequestOptions {
  body?: unknown
  headers?: Record<string, string>
}

async function request<T>(
  method: HttpMethod,
  endpoint: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}/${endpoint}`

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  })

  const data = (await res.json()) as ApiResponse<T>

  if (!res.ok) {
    throw new Error(data.error?.message ?? `Error ${res.status}: ${res.statusText}`)
  }

  return data
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>('GET', endpoint, options),
  post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>('POST', endpoint, { ...options, body }),
  put: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>('PUT', endpoint, { ...options, body }),
  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>('DELETE', endpoint, options),
}
