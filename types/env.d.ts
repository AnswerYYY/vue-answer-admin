/// <reference types="vite/client" />

interface ImportMetaEnv extends ViteEnv {
  __: unknown
}

interface ImportMeta {
  readonly env: ViteEnv
}
