export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface CodeExecuteRequest {
  language: string;
  code: string;
  stdin?: string;
}

export interface CodeExecuteResponse {
  language: string;
  output?: string;
  error?: string;
  exitCode?: number;
  timedOut?: boolean;
  durationMs?: number;
}