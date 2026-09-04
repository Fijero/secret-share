export interface PushPayload {
  encrypted: string;
  ttl: number;
  once: boolean;
  project?: string;
}

export interface PushResponse {
  code: string;
}

export interface PullResponse {
  encrypted: string;
}
