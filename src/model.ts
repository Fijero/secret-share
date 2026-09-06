export interface PushPayload {
  encrypted: any;
  ttl: number;
  once: boolean;
  project?: string;
}

export interface PushResponse {
  code: string;
}

export interface PullOptions {
  output: string;
}

export interface PullResponse {
  encrypted: string;
}

// for commands dir
export interface PushOptions {
  ttl: string;
  once: boolean;
  project?: string;
}
