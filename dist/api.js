"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const axios_1 = __importDefault(require("axios"));
const SERVER_URL = process.env.SERVER_URL ?? "http://localhost:8080";
const client = axios_1.default.create({
    baseURL: SERVER_URL,
    headers: { "Content-Type": "application/json" },
});
exports.api = {
    push: async (payload) => {
        try {
            const res = await client.post("/push", payload);
            return res.data;
        }
        catch (error) {
            // throw the actual server message
            throw new Error(error.response?.data?.message ?? error.message);
        }
    },
    pull: async (code) => {
        try {
            const res = await client.get(`/pull/${code}`);
            return res.data;
        }
        catch (error) {
            throw new Error(error.response?.data?.message ?? error.message);
        }
    },
};
