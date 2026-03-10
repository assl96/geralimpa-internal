export interface ApiResponse<T = unknown> {
  message: string
  data?: T
  error?: ApiError
}

export interface ApiError {
  message: string
  status: number
}
