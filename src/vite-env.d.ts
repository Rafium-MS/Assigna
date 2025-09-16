/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_NOTIFICATIONS_API_URL?: string;
  }
}

export {};
