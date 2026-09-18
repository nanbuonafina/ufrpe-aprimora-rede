/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ASSESSORIA_WEBHOOK_URL?: string
  readonly VITE_INSTAGRAM_ACCESS_TOKEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
