import { PullResponse, PushPayload, PushResponse } from "./model";
export declare const api: {
    push: (payload: PushPayload) => Promise<PushResponse>;
    pull: (code: string) => Promise<PullResponse>;
};
