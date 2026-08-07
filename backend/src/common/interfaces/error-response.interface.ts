export interface ErrorPayload {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  hint?: string;
}

export interface ApiErrorBody {
  error: ErrorPayload;
}
