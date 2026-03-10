import { apiClient } from './api.client'
import type { ApiResponse } from '@/types/api'

// Aquí defines la forma de un registro de "example"
export interface ExampleRecord {
  id?: number
  [key: string]: unknown
}

export const exampleService = {
  getAll(): Promise<ApiResponse<ExampleRecord[]>> {
    return apiClient.get<ExampleRecord[]>('example')
  },

  getById(id: number): Promise<ApiResponse<ExampleRecord>> {
    return apiClient.get<ExampleRecord>(`example/${id}`)
  },

  create(body: ExampleRecord): Promise<ApiResponse<ExampleRecord>> {
    return apiClient.post<ExampleRecord>('example', body)
  },

  update(id: number, body: ExampleRecord): Promise<ApiResponse<ExampleRecord>> {
    return apiClient.put<ExampleRecord>(`example/${id}`, body)
  },

  remove(id: number): Promise<ApiResponse<ExampleRecord>> {
    return apiClient.delete<ExampleRecord>(`example/${id}`)
  },
}
