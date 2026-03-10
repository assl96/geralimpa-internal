import { ref } from 'vue'
import type { ApiResponse } from '@/types/api'
import { apiClient } from '@/services/api.client'

type ApiClientMethod = typeof apiClient

export function useApi() {
  const cargando = ref(false)
  const error = ref<string | null>(null)

  async function call<T>(
    fn: () => Promise<ApiResponse<T>>,
  ): Promise<ApiResponse<T> | null> {
    cargando.value = true
    error.value = null
    try {
      return await fn()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      return null
    } finally {
      cargando.value = false
    }
  }

  return { cargando, error, call, apiClient: apiClient as ApiClientMethod }
}
