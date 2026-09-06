import axios from "axios";
import { PullResponse, PushPayload, PushResponse } from "./model";

const SERVER_URL = process.env.SERVER_URL ?? "http://localhost:8080";
const client = axios.create({
  baseURL: SERVER_URL,
  headers: { "Content-Type": "application/json" },
});

export const api = {
  push: async (payload: PushPayload): Promise<PushResponse> => {
    try {
      const res = await client.post<PushResponse>("/push", payload);
      return res.data;
    } catch (error: any) {
      // throw the actual server message
      throw new Error(error.response?.data?.message ?? error.message);
    }
  },

  pull: async (code: string): Promise<PullResponse> => {
    try {
      const res = await client.get<PullResponse>(`/pull/${code}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? error.message);
    }
  },
};
